import { ElementMixin } from '../shared/element.js'
import { InternalsMixin, internals } from '../shared/internals.js'
import { InteractiveMixin } from '../shared/interactive.js'
import { FieldMixin } from '../shared/field.js'
import { ensureMessageElement, markInvalid, markValid, onDisabledChange } from '../shared/helpers.js'
import thisStylesheet from './input.css'

const innerInput = Symbol('innerInput')
const updateValidity = Symbol('updateValidity')

class PiWoInput extends FieldMixin(InteractiveMixin(InternalsMixin(ElementMixin(HTMLElement, {
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
        this[innerInput].required = value
      }
    },
    multiple: {
      type: 'boolean', aria: true, reflect: true,
      set(value) {
        this[innerInput].multiple = value
      }
    },
    describeerror: { type: 'boolean', property: 'describeError', reflect: true },
    focuserror: { type: 'boolean', property: 'focusError', reflect: true },
    name: { type: 'string', reflect: true },
    type: {
      type: 'string', reflect: true,
      set(value) {
        this[innerInput].type = value
      }
    },
    autocomplete: {
      type: 'string', reflect: true,
      set() {
        this[innerInput].autocomplete = value
      }
    },
    pattern: {
      type: 'string', reflect: true,
      set(value) {
        this[innerInput].pattern = value
      }
    },
    placeholder: {
      type: 'string', reflect: true,
      set(value) {
        this[innerInput].placeholder = value
      }
    },
    max: {
      type: 'string', reflect: true,
      set(value) {
        this[innerInput].max = value
      }
    },
    min: {
      type: 'string', reflect: true,
      set(value) {
        this[innerInput].min = value
      }
    },
    step: {
      type: 'number', reflect: true,
      set(value) {
        this[innerInput].step = value
      }
    },
    maxlength: {
      type: 'number', property: 'maxLength', value: -1, internals: true, reflect: true,
      set(value) {
        this[innerInput].maxLength = value
      }
    },
    minlength: {
      type: 'number', property: 'minLength', value: -1, internals: true, reflect: true,
      set(value) {
        this[innerInput].minLength = value
      }
    },
    value: {
      type: 'string',
      set(value) {
        this[innerInput].value = value
        this[updateValidity]()
      }
    }
  },
  delegatesFocus: true
})))) {
  constructor() {
    super()
    this[internals].role = 'textbox'

    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
    this[innerInput] = document.createElement('input')
    this[innerInput].ariaHidden = 'true'
    this.shadowRoot.appendChild(this[innerInput])

    this[innerInput].addEventListener('beforeinput', event => this.#handleBeforeInput(event))
    this[innerInput].addEventListener('input', event => this.#handleInputAndChange(event))
    this[innerInput].addEventListener('change', event => this.#handleInputAndChange(event))
  }

  // ----- life-cycle callbacks

  connectedCallback() {
    super.connectedCallback()
    const keepValid = this.getAttribute('aria-invalid') === 'false'
    this.value = this.getAttribute('value')
    this[updateValidity](keepValid)
    if (this.validity.valid) {
      ensureMessageElement(this)
    }
  }

  formResetCallback() {
    this.value = this.getAttribute('value')
  }

  formStateRestoreCallback(state, _mode) { // restore or autocomplete
    this.value = state
  }

  // formAssociatedCallback(form) {
  // }

  formDisabledCallback(disabled) {
    this[innerInput].disabled = disabled
  }

  // ----- event handlers

  #handleBeforeInput(event) {
    const newEvent = this.#forwardEvent(event)
    if (newEvent.defaultPrevented) {
      event.preventDefault()
    }
  }

  #handleInputAndChange(event) {
    this.value = this[innerInput].value
    this.#forwardEvent(event)
  }

  #forwardEvent(event) {
    const newEvent = new event.constructor(event.type, event)
    this.dispatchEvent(newEvent)
    return newEvent
  }

  // ----- form validation

  checkValidity() {
    return super.checkValidity() && this[innerInput].checkValidity()
  }

  reportValidity() {
    return super.reportValidity() && this[innerInput].checkValidity()
  }

  setCustomValidity(message) {
    setCustomError(this, this[innerInput], message)
  }

  [updateValidity](keepValid) {
    this[internals].setFormValue(this.value, this.value)
    const { validity } = this[innerInput]
    if (validity.valid) {
      this[internals].setValidity({})
      this.ariaInvalid = keepValid ? 'false': null
      markValid(this)
    } else {
      this[internals].setValidity(validity,
        this[innerInput].validationMessage, this[innerInput])
      if (this.getAttribute('aria-invalid') === 'true') {
        markInvalid(this)
      }
    }
  }
}

customElements.define('piwo-input', PiWoInput)
