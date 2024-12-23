import { ElementMixin, internals } from '../shared/element.js'
import { FieldMixin } from '../shared/field.js'
import { ensureMessageElement, formatPlural, markInvalid, markValid, onDisabledChange, setCustomError } from '../shared/helpers.js'
import thisStylesheet from './textarea.css'

const updateValidity = Symbol('updateValidity')

class PiWoTextArea extends FieldMixin(ElementMixin(HTMLElement, {
  internals: true,
  attributes: {
    disabled: {
      type: 'boolean', aria: true, state: true, reflect: true,
      set(value) {
        onDisabledChange(this, value)
      }
    },
    readonly: { type: 'boolean', aria: 'ariaReadOnly', state: true, reflect: true },
    required: { type: 'boolean', aria: 'ariaReadOnly', state: true, reflect: true },
    describeerror: { type: 'boolean', property: 'describeError', reflect: true },
    focuserror: { type: 'boolean', property: 'focusError', reflect: true },
    name: { type: 'string', reflect: true },
    placeholder: { type: 'string', internals: true, aria: true, reflect: true },
    maxlength: { type: 'number', property: 'maxLength', value: -1, internals: true, reflect: true },
    minlength: { type: 'number', property: 'minLength', value: -1, internals: true, reflect: true },
    value: {
      type: 'string',
      set() {
        this[updateValidity]()
      }
    }
  },
  interactive: true
})) {
  #errorAnchor

  constructor() {
    super()
    // try {
    //   this.contentEditable = 'plaintext-only'
    // } catch {
    this.contentEditable = true
    // }

    this[internals].role = 'textbox'
    this[internals].ariaMultiLine = true

    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.#errorAnchor = createErrorAnchor(this)

    // this.#errorAnchor.addEventListener('focus', () => this.focus())
    this.addEventListener('beforeinput', event => this.#handleBeforeInput(event))
    this.addEventListener('input', event => this.#handleInput(event))
    this.addEventListener('blur', event => this.#handleBlur(event))
  }

  // ----- life-cycle callbacks

  connectedCallback() {
    super.connectedCallback()
    const keepValid = this.getAttribute('aria-invalid') === 'false'
    this.value = this.textContent
    this[updateValidity](keepValid)
    if (this.validity.valid) {
      ensureMessageElement(this)
    }
  }

  formResetCallback() {
    this.value = this.textContent
  }

  formStateRestoreCallback(state, _mode) { // restore or autocomplete
    this.value = state
  }

  // formAssociatedCallback(form) {
  // }

  // formDisabledCallback(disabled) {
  // }

  // ----- event handlers

  #handleBeforeInput(event) {
    if (this.readonly) {
      event.preventDefault()
    }
  }

  #dirty = false

  #handleInput() {
    this.#dirty = true
    this.value = this.textContent
  }

  #handleBlur() {
    if (this.#dirty) {
      this.#dirty = false
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          value: this.value,
        },
        bubbles: true,
        cancelable: false,
        composed: true
      }))
    }
  }

  // ----- form validation

  setCustomValidity(message) {
    setCustomError(this, this.#errorAnchor, message)
  }

  [updateValidity](keepValid) {
    this[internals].setFormValue(this.value, this.value)
    const { length } = this.value
    const criteria = []
    let message
    if (this.required && !length) {
      criteria.push('valueMissing')
      message = 'Please fill out this field.'
    }
    if (this.minLength > 0 && this.minLength > length) {
      criteria.push('tooShort')
      if (!message) {
        message = `Please use at least ${formatPlural(this.minLength, 'character')} characters (you are currently using ${formatPlural(length, 'character')}).`
      }
    }
    if (this.minLength > 0 && this.maxLength < length) {
      criteria.push('tooLong')
      if (!message) {
        message = `Please use at most ${formatPlural(this.maxLength, 'character')} characters (you are currently using ${formatPlural(length, 'character')}).`
      }
    }
    if (message) {
      const validity = {}
      for (const criterion of criteria) {
        validity[criterion] = true
      }
      this[internals].setValidity(validity, message, this.#errorAnchor)
      if (this.getAttribute('aria-invalid') === 'true') {
        markInvalid(this)
      }
      return
    }
    this[internals].setValidity({})
    this.ariaInvalid = keepValid ? 'false': null
    markValid(this)
  }
}

customElements.define('piwo-textarea', PiWoTextArea)
