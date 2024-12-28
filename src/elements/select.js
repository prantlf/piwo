import { AttributesMixin } from '../shared/attributes.js'
import { InternalsMixin, internals } from '../shared/internals.js'
import { ShadowMixin } from '../shared/shadow.js'
import { InteractiveMixin } from '../shared/interactive.js'
import { FieldMixin } from '../shared/field.js'
import { ensureMessageElement, markInvalid, markValid, onDisabledChange } from '../shared/helpers.js'
import thisStylesheet from './select.css'

const innerSelect = Symbol('innerSelect')
const updateValidity = Symbol('updateValidity')

class PiWoSelect extends FieldMixin(InteractiveMixin(ShadowMixin(InternalsMixin(AttributesMixin(HTMLElement, {
  attributes: {
    disabled: {
      type: 'boolean', aria: true, state: true, reflect: true,
      set(value) {
        onDisabledChange(this, value)
      }
    },
    readonly: { type: 'boolean', aria: 'ariaReadOnly', state: true, reflect: true },
    required: {
      type: 'boolean', aria: true, state: true, reflect: true,
      set(value) {
        this[innerSelect].required = value
      }
    },
    multiple: {
      type: 'boolean', aria: true, reflect: true,
      set(value) {
        this[innerSelect].multiple = value
      }
    },
    describeerror: { type: 'boolean', property: 'describeError', reflect: true },
    focuserror: { type: 'boolean', property: 'focusError', reflect: true },
    name: { type: 'string', reflect: true },
    autocomplete: {
      type: 'string', reflect: true,
      set() {
        this[innerSelect].autocomplete = value
      }
    }
  }
})), {
  delegatesFocus: true
}))) {
  #slot
  #firstSlotChanged = true

  constructor() {
    super()
    this[internals].role = 'listbox'

    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
    this.#slot = document.createElement('slot')
    this.shadowRoot.appendChild(this.#slot)
    this[innerSelect] = document.createElement('select')
    // this[innerSelect].ariaHidden = 'true'
    this.shadowRoot.appendChild(this[innerSelect])

    this.#slot.addEventListener('slotchange', () => this.#updateOptions())
    this[innerSelect].addEventListener('beforeinput', event => this.#handleBeforeInput(event))
    this[innerSelect].addEventListener('input', event => this.#handleInputAndChange(event))
    this[innerSelect].addEventListener('change', event => this.#handleInputAndChange(event))
  }

    // ----- properties

    get length() {
      return this[innerSelect].length
    }

    get options() {
      return this[innerSelect].options
    }

    get selectedIndex() {
      return this[innerSelect].selectedIndex
    }

    set selectedIndex(value) {
      this[innerSelect].selectedIndex = value
      this[updateValidity]()
    }

    get selectedOptions() {
      return this[innerSelect].selectedOptions
    }

    get type() {
      return this.multiple ? 'select-multiple' : 'select-one'
    }

    get value() {
      return this[innerSelect].value
    }

    set value(value) {
      this[innerSelect].value = value
      this[updateValidity]()
    }

  // ----- life-cycle callbacks

  connectedCallback() {
    super.connectedCallback()
    if (!this.size) {
      this.size = this.multiple ? 4 : 1
    }
    const keepValid = this.getAttribute('aria-invalid') === 'false'
    // this.value = this.defaultValue
    this[updateValidity](keepValid)
    if (this.validity.valid) {
      ensureMessageElement(this)
    }
  }

  formResetCallback() {
    // this.value = this.defaultValue
  }

  formStateRestoreCallback(state, _mode) { // restore or autocomplete
    this.value = state
  }

  formDisabledCallback(disabled) {
    this[innerSelect].disabled = disabled
  }

  // ----- event handlers

  #handleBeforeInput(event) {
    const newEvent = this.#forwardEvent(event)
    if (newEvent.defaultPrevented) {
      event.preventDefault()
    }
  }

  #handleInputAndChange(event) {
    this.value = this[innerSelect].value
    this.#forwardEvent(event)
  }

  #forwardEvent(event) {
    const newEvent = new event.constructor(event.type, event)
    this.dispatchEvent(newEvent)
    return newEvent
  }

  #updateOptions() {
    const slotted = this.#slot.assignedElements()
    const options = Array
      .from(slotted)
      .map(option => option.cloneNode(true))
    this[innerSelect].replaceChildren(...options)
    let keepValid
    if (this.#firstSlotChanged) {
      keepValid = this.getAttribute('aria-invalid') === 'false'
      this.#firstSlotChanged = false
    }
    this[updateValidity](keepValid)
  }

  // ----- form validation

  checkValidity() {
    return super.checkValidity() && this[innerSelect].checkValidity()
  }

  reportValidity() {
    return super.reportValidity() && this[innerSelect].checkValidity()
  }

  setCustomValidity(message) {
    setCustomError(this, this[innerSelect], message)
  }

  [updateValidity](keepValid) {
    this[internals].setFormValue(this.value, this.value)
    const { validity } = this[innerSelect]
    if (validity.valid) {
      this[internals].setValidity({})
      this.ariaInvalid = keepValid ? 'false': null
      markValid(this)
    } else {
      this[internals].setValidity(validity,
        this[innerSelect].validationMessage, this[innerSelect])
      if (this.getAttribute('aria-invalid') === 'true') {
        markInvalid(this)
      }
    }
  }
}

customElements.define('piwo-select', PiWoSelect)
