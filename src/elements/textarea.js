import { findLabels, formatPlural, upgradeProperty } from '../shared/helpers.js'
import commonStylesheet from '../shared/common.css'
import thisStylesheet from './textarea.css'

const booleanAttributes = [
  'disabled', 'readonly', 'required', 'describeerror', 'focuserror'
]
const stringAttributes = [
  'name', 'placeholder', 'maxlength', 'minlength'
]
const allAttributes = booleanAttributes.concat(stringAttributes)
const propertyNames = {
  describeerror: 'describeError',
  focuserror: 'focusError',
  maxlength: 'maxLength',
  minlength: 'minLength'
}

class PiWoTextArea extends HTMLElement {
  #internals
  #errorAnchor

  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    // try {
    //   this.contentEditable = 'plaintext-only'
    // } catch {
    this.contentEditable = true
    // }

    this.#internals = this.attachInternals()
    this.#internals.role = 'textbox'
    this.#internals.ariaMultiLine = true

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [commonStylesheet, thisStylesheet]
    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.#errorAnchor = document.createElement('input')
    this.#errorAnchor.tabIndex = -1
    this.#errorAnchor.ariaHidden = 'true'
    this.#errorAnchor.ariaDisabled = 'true'
    this.shadowRoot.appendChild(this.#errorAnchor)

    // this.#errorAnchor.addEventListener('focus', () => this.focus())
    this.addEventListener('beforeinput', event => this.#handleBeforeInput(event))
    this.addEventListener('input', event => this.#handleInput(event))
    this.addEventListener('blur', event => this.#handleBlur(event))
    this.addEventListener('invalid', event => this.#handleInvalid(event))

    for (const attributeName in allAttributes) {
      const propertyName = propertyNames[attributeName] ?? attributeName
      upgradeProperty(this, propertyName)
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
    if (value === this.#name) return
    this.#name = value
    this.setAttribute('name', value)
  }

  #placeholder = ''

  get placeholder() {
    return this.#placeholder
  }

  set placeholder(value) {
    if (value == null) value = ''
    if (value === this.#placeholder) return
    this.#placeholder = this.#internals.placeholder = this.#internals.ariaPlaceholder = value
    this.setAttribute('placeholder', value)
  }

  #value = ''

  get value() {
    return this.#value
  }

  set value(value) {
    if (value == null) value = ''
    if (value === this.#value) return
    this.#value = value
    this.#updateValidity()
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
    if (value === this.#maxLength) return
    this.#maxLength = this.#internals.maxLength = value
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
    if (value === this.#minLength) return
    this.#minLength = this.#internals.minLength = value
    this.setAttribute('minlength', value)
  }

  #describeError = false

  get describeError() {
    return this.#describeError
  }

  set describeError(value) {
    value = Boolean(value)
    if (value === this.#describeError) return
    this.#describeError = value
    this.toggleAttribute('describeerror', value)
  }

  #focusError = false

  get focusError() {
    return this.#focusError
  }

  set focusError(value) {
    value = Boolean(value)
    if (value === this.#focusError) return
    this.#focusError = value
    this.toggleAttribute('focuserror', value)
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
    if (attribute) {
      this.toggleAttribute(name, flag)
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
    const propertyName = propertyNames[name] ?? name
    if (booleanAttributes.includes(name)) {
      this[propertyName] = newValue != null
    } else {
      this[propertyName] = newValue
    }
  }

  connectedCallback() {
    // not yet in internals - https://github.com/WICG/webcomponents/issues/762
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = this.disabled ? -1 : 0
    }
    const keepValid = this.getAttribute('aria-invalid') === 'false'
    this.value = this.textContent
    this.#updateValidity(keepValid)
    if (this.validity.valid) {
      this.#ensureMessageElement()
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
          value: this.#value,
        },
        bubbles: true,
        cancelable: false,
        composed: true
      }))
    }
  }

  #handleInvalid(event) {
    // detect if `reportValidity` was called from a user interaction
    if (event.explicitOriginalTarget && event.explicitOriginalTarget !== this || this.form.submitter) {
      this.ariaInvalid = 'true'
      if (this.#describeError) {
        event.preventDefault()
        this.#markInvalid()
      }
    }
  }

  #markInvalid() {
    if (this.#ensureMessageElement()) {
      this.#messageElement.style.display = ''
      this.#messageElement.textContent = this.validationMessage
      const { form } = this
      if (this.#focusError && !form?.errorFocused) {
        if (form) {
          form.errorFocused = true
        }
        this.focus()
        if (form) {
          setTimeout(() => {
            form.errorFocused = false
          });
        }
      }
    }
  }

  #messageElement
  #originalMessage = ''

  #ensureMessageElement() {
    const messageIds = this.getAttribute('aria-describedby')
    if (messageIds) {
      const messageId = messageIds.trim().split(/ +/).slice(-1)[0]
      if (messageId) {
        const messageElement = document.getElementById(messageId.trim())
        if (messageElement) {
          if (messageElement !== this.#messageElement) {
            this.#messageElement = messageElement
            this.#originalMessage = messageElement.textContent
            if (!this.#originalMessage) {
              this.#messageElement.style.display = 'none'
            }
          }
          return true
        }
      }
    }
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
    return this.#internals.checkValidity()
  }

  reportValidity() {
    this.ariaInvalid = String(!this.validity.valid)
    return this.#internals.reportValidity()
  }

  setCustomValidity(message) {
    if (message) {
      this.#internals.setValidity({ customError: true }, message, this.#errorAnchor)
    } else {
      this.#internals.setValidity({})
    }
  }

  #updateValidity(keepValid) {
    this.#internals.setFormValue(this.#value, this.#value);
    const { length } = this.#value
    const criteria = []
    let message
    if (this.required && !length) {
      criteria.push('valueMissing')
      message = 'Please fill out this field.'
    }
    if (this.#minLength > 0 && this.#minLength > length) {
      criteria.push('tooShort')
      if (!message) {
        message = `Please use at least ${formatPlural(this.#minLength, 'character')} characters (you are currently using ${formatPlural(length, 'character')}).`
      }
    }
    if (this.#minLength > 0 && this.#maxLength < length) {
      criteria.push('tooLong')
      if (!message) {
        message = `Please use at most ${formatPlural(this.#maxLength, 'character')} characters (you are currently using ${formatPlural(length, 'character')}).`
      }
    }
    if (message) {
      const validity = {}
      for (const criterion of criteria) {
        validity[criterion] = true
      }
      this.#internals.setValidity(validity, message, this.#errorAnchor)
      if (this.getAttribute('aria-invalid') === 'true') {
        this.#markInvalid()
      }
      return
    }
    this.#internals.setValidity({})
    this.ariaInvalid = keepValid ? 'false': null
    this.#markValid()
  }

  #markValid() {
    if (this.#messageElement) {
      this.#messageElement.textContent = this.#originalMessage
      if (!this.#originalMessage) {
        this.#messageElement.style.display = 'none'
      }
      this.#messageElement = null
      this.#originalMessage = ''
    }
  }
}

customElements.define('piwo-textarea', PiWoTextArea)
