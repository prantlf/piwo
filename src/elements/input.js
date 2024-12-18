import { createStylesheet, findLabels, upgradeProperty } from '../shared/helpers.js'
import styles from './input.css'

const stylesheet = createStylesheet(styles)
const booleanAttributes = [
  'disabled', 'readonly', 'required', 'multiple', 'describeerror', 'focuserror'
]
const stringAttributes = [
  'name', 'type', 'placeholder', 'autocomplete', 'step', 'pattern',
  'max', 'min', 'maxLength', 'minLength'
]
const allAttributes = booleanAttributes.concat(stringAttributes)

class PiWoInput extends HTMLElement {
  #internals
  #innerInput

  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'textbox'

    this.attachShadow({ mode: 'open', delegatesFocus: true })
    this.shadowRoot.adoptedStyleSheets = [stylesheet]
    this.#innerInput = document.createElement('input')
    this.#innerInput.ariaHidden = 'true'
    this.shadowRoot.appendChild(this.#innerInput)

    this.#innerInput.addEventListener('beforeinput', event => this.#handleBeforeInput(event))
    this.#innerInput.addEventListener('input', event => this.#handleInput(event))
    this.#innerInput.addEventListener('change', event => this.#handleChange(event))
    this.addEventListener('invalid', event => this.#handleInvalid(event))

    for (const name in PiWoInput.observedAttributes) {
      upgradeProperty(this, name)
    }
  }

  // ----- properties

  get form() {
    return this.#internals.form
  }

  get labels() {
    const labels = this.#internals.labels
    if (labels.length) return labels
    return findLabels(this)
  }

  #name = ''

  get name() {
    return this.#name
  }

  set name(value) {
    if (value == null) value = ''
    if (value === this.name) return
    this.#name = value
    this.setAttribute('name', value)
  }

  #type = ''

  get type() {
    return this.#type
  }

  set type(value) {
    if (value == null) value = ''
    if (value === this.type) return
    this.#type = this.#innerInput.type = value
    this.setAttribute('type', this.#type)
  }

  #placeholder = ''

  get placeholder() {
    return this.#placeholder
  }

  set placeholder(value) {
    if (value == null) value = ''
    if (value === this.placeholder) return
    this.#placeholder = this.#innerInput.placeholder = value
    this.setAttribute('placeholder', this.#placeholder)
  }

  #value = ''

  get value() {
    return this.#value
  }

  set value(value) {
    if (value == null) value = ''
    if (value === this.value) return
    this.#value = this.#innerInput.value = value
    this.#updateValidity()
  }

  #autocomplete = ''

  get autocomplete() {
    return this.#autocomplete
  }

  set autocomplete(value) {
    if (value == null) value = ''
    if (value === this.autocomplete) return
    this.#autocomplete = this.#innerInput.autocomplete = value
    this.setAttribute('autocomplete', value)
  }

  #max = ''

  get max() {
    return this.#max
  }

  set max(value) {
    if (value == null) value = ''
    if (value === this.max) return
    this.#max = this.#innerInput.max = value
    this.setAttribute('max', value)
  }

  #min = ''

  get min() {
    return this.#min
  }

  set min(value) {
    if (value == null) value = ''
    if (value === this.min) return
    this.#min = this.#innerInput.min = value
    this.setAttribute('min', value)
  }

  #maxLength = -1

  get maxLength() {
    return this.#maxLength
  }

  set maxLength(value) {
    if (value == null) {
      value = -1
    } else {
      value = +value
      if (Number.isNaN(value)) {
        value = -1
      }
    }
    if (value === this.maxLength) return
    this.#maxLength = this.#innerInput.maxLength = value
    this.setAttribute('maxlength', value)
  }

  #minLength = -1

  get minLength() {
    return this.#minLength
  }

  set minLength(value) {
    if (value == null) {
      value = -1
    } else {
      value = +value
      if (Number.isNaN(value)) {
        value = -1
      }
    }
    if (value === this.minLength) return
    this.#minLength = this.#innerInput.minLength = value
    this.setAttribute('minlength', value)
  }

  #multiple = false

  get multiple() {
    return this.#multiple
  }

  set multiple(value) {
    value = Boolean(value)
    if (value === this.multiple) return
    this.#multiple = this.#innerInput.multiple = value
    this.toggleAttribute('multiple', value)
  }

  #describeError = false

  get describeError() {
    return this.#describeError
  }

  set describeError(value) {
    value = Boolean(value)
    if (value === this.describeError) return
    this.#describeError = value
    this.toggleAttribute('describeerror', value)
  }

  #focusError = false

  get focusError() {
    return this.#focusError
  }

  set focusError(value) {
    value = Boolean(value)
    if (value === this.focusError) return
    this.#focusError = value
    this.toggleAttribute('focuserror', value)
  }

  #pattern = ''

  get pattern() {
    return this.#pattern
  }

  set pattern(value) {
    if (value == null) value = ''
    if (value === this.pattern) return
    this.#pattern = this.#innerInput.pattern = value
    this.setAttribute('pattern', value)
  }

  #step = ''

  get step() {
    return this.#step
  }

  set step(value) {
    if (value == null) value = ''
    if (value === this.step) return
    this.#step = this.#innerInput.step = value
    this.setAttribute('step', value)
  }

  get disabled() {
    return this.#getFlag('disabled')
  }

  set disabled(flag) {
    if (this.#setFlag('disabled', 'Disabled', true, flag)) {
      if (flag) {
        const root = this.getRootNode()
        if (root.activeElement === this) {
          this.blur()
        }
        if (this.tabIndex >= 0) {
          this.tabIndex = -1
        }
      } else {
        if (this.tabIndex < 0) {
          this.tabIndex = 0
        }
      }
    }
  }

  get readonly() {
    return this.#getFlag('readonly')
  }

  set readonly(flag) {
    this.#setFlag('readonly', 'ReadOnly', true, flag)
  }

  get required() {
    return this.#getFlag('required')
  }

  set required(flag) {
    this.#setFlag('required', 'Required', true, flag)
  }

  #getFlag(name) {
    return this.#internals.states.has(name)
  }

  #setFlag(name, ariaName, attribute, flag) {
    flag = Boolean(flag)
    if (flag === this[name]) return
    if (flag) {
      this.#internals.states.add(name)
    } else {
      this.#internals.states.delete(name)
    }
    this.#innerInput[name] = flag
    if (attribute) {
      this.toggleAttribute(name, flag)
      this.#innerInput.toggleAttribute(name, flag)
    }
    if (ariaName) {
      this.#internals[`aria${ariaName}`] = String(flag)
    }
    return true
  }

  // ----- life-cycle callbacks

  static get observedAttributes() {
    return allAttributes
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (booleanAttributes.includes(name)) {
      newValue = newValue != null
      switch (name) {
        case 'describeerror':
          this.describeError = newValue
          break
        case 'focuserror':
          this.focusError = newValue
          break
        default:
          this[name] = newValue
      }
    } else {
      this[name] = newValue
    }
  }

  connectedCallback() {
    // not yet in internals - https://github.com/WICG/webcomponents/issues/762
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0
    }
    const keepValid = this.getAttribute('aria-invalid') === 'false'
    this.value = this.getAttribute('value')
    this.#updateValidity(keepValid)
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
    this.#innerInput.disabled = disabled
  }

  // ----- event handlers

  #handleBeforeInput(event) {
    const newEvent = this.#forwardEvent(event)
    if (newEvent.defaultPrevented) {
      event.preventDefault()
    }
  }

  #handleInput(event) {
    this.value = this.#innerInput.value
    this.#forwardEvent(event)
  }

  #handleChange(event) {
    this.value = this.#innerInput.value
    this.#forwardEvent(event)
  }

  #handleInvalid(event) {
    // detect if `reportValidity` was called from a user interaction
    if (event.explicitOriginalTarget && event.explicitOriginalTarget !== this || this.form.submitter) {
      this.ariaInvalid = 'true'
      if (this.describeError) {
        event.preventDefault()
        this.#markInvalid()
      }
    }
  }

  #markInvalid() {
    const messageIds = this.getAttribute('aria-describedby')
    if (messageIds) {
      const messageId = messageIds.trim().split(/ +/).slice(-1)[0]
      if (messageId) {
        const messageElement = document.getElementById(messageId.trim())
        if (messageElement) {
          if (!this.#messageElement) {
            this.#messageElement = messageElement
            this.#originalMessage = messageElement.textContent
            if (!this.#originalMessage) {
              this.#messageElement.style.display = ''
            }
          }
          messageElement.textContent = this.validationMessage
          if (this.focusError) {
            this.focus()
          }
        }
      }
    }
  }

  #forwardEvent(event) {
    const newEvent = new event.constructor(event.type, event)
    this.dispatchEvent(newEvent)
    return newEvent
  }

  // ----- form validation

  get willValidate() {
    return this.#internals.willValidate
  }

  get validity() {
    return this.#internals.validity
  }

  get validationMessage() {
    return this.#internals.validationMessage
  }

  checkValidity() {
    return this.#internals.checkValidity() && this.#innerInput.checkValidity()
  }

  reportValidity() {
    this.ariaInvalid = String(!this.validity.valid)
    return this.#internals.reportValidity() && this.#internals.checkValidity()
  }

  setCustomValidity(message) {
    if (message) {
      this.#internals.setValidity({ customError: true }, message, this.#innerInput)
    } else {
      this.#internals.setValidity({})
    }
  }

  #messageElement
  #originalMessage = ''

  #updateValidity(keepValid) {
    this.#internals.setFormValue(this.#value, this.#value);
    const { validity } = this.#innerInput
    if (validity.valid) {
      this.#internals.setValidity({})
      this.ariaInvalid = keepValid ? 'false': null
      if (this.#messageElement) {
        this.#messageElement.textContent = this.#originalMessage
        if (!this.#originalMessage) {
          this.#messageElement.style.display = 'none'
        }
        this.#messageElement = null
        this.#originalMessage = ''
      }
    } else {
      this.#internals.setValidity(validity,
        this.#innerInput.validationMessage, this.#innerInput)
      if (this.getAttribute('aria-invalid') === 'true') {
        this.#markInvalid()
      }
    }
  }
}

customElements.define('piwo-input', PiWoInput)
