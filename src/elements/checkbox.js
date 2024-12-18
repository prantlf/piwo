import { createStylesheet, findLabels, upgradeProperty } from '../shared/helpers.js'
import styles from './checkbox.css'

const stylesheet = createStylesheet(styles)
const booleanAttributes = [
  'disabled', 'readonly', 'required', 'describeerror', 'focuserror'
]
const allAttributes = booleanAttributes.concat('name')

class PiWoCheckbox extends HTMLElement {
  #internals
  #errorAnchor

  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'checkbox'
    this.#internals.ariaChecked = 'false'

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [stylesheet]
    this.#errorAnchor = document.createElement('input')
    this.#errorAnchor.ariaHidden = 'true'
    this.shadowRoot.appendChild(this.#errorAnchor)

    this.addEventListener('click', event => this.#handleClick(event))
    this.addEventListener('keyup', event => this.#handleKeyUp(event))
    this.addEventListener('invalid', event => this.#handleInvalid(event))

    for (const name in PiWoCheckbox.observedAttributes) {
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

  get type() {
    return this.localName
  }

  // get value() {
  //   return this.checked ? 'on' : this.willValidate ? '' : null
  // }

  // set value(flag) {
  //   this.checked = flag === 'on'
  // }

  get checked() {
    return this.#getFlag('checked')
  }

  set checked(flag) {
    if (this.#setFlag('checked', 'Checked', false, flag)) {
      this.#internals.states.delete('indeterminate')
      this.#updateValidity()
    }
  }

  get indeterminate() {
    return this.#getFlag('indeterminate')
  }

  set indeterminate(flag) {
    if (this.#setFlag('indeterminate', undefined, false, flag)) {
      if (flag) {
        this.#internals.ariaChecked = 'mixed'
      } else {
        this.#internals.ariaChecked = String(this.checked)
      }
    }
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
    this.checked = this.hasAttribute('checked')
    if (this.hasAttribute('indeterminate')) {
      this.indeterminate = true
    }
    this.#updateValidity(keepValid)
  }

  formResetCallback() {
    this.checked = this.hasAttribute('checked')
  }

  formStateRestoreCallback(state, _mode) { // restore or autocomplete
    this.checked = state === 'checked'
  }

  // formAssociatedCallback(form) {
  // }

  // formDisabledCallback(disabled) {
  //   this.disabled = disabled
  // }

  // ----- event handlers

  #handleClick(event) {
    if (!(this.disabled || this.readonly) &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)) {
      // give a chance to handlers registered outside of this element
      // to prevent the default behaviour
      setTimeout(() => {
        if (event.defaultPrevented) return

        const beforeInput = new CustomEvent('beforeinput', {
          bubbles: true,
          cancelable: true,
          composed: true
        })
        this.dispatchEvent(beforeInput)
        if (beforeInput.defaultPrevented) return

        const flag = !this.checked
        this.checked = flag

        this.dispatchEvent(new CustomEvent('input', {
          bubbles: true,
          cancelable: false,
          composed: true
        }))
        this.dispatchEvent(new CustomEvent('change', {
          detail: {
            checked: flag,
          },
          bubbles: true,
          cancelable: false,
          composed: true
        }))
      })
    }
  }

  #handleKeyUp(event) {
    if (!this.disabled &&
        event.keyCode === 32 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)) {
      // give a chance to handlers registered outside of this element
      // to prevent the default behaviour
      setTimeout(() => {
        if (event.defaultPrevented) return
        this.click()
      })
    }
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

  // #invalidEvent

  checkValidity() {
    return this.#internals.checkValidity()
    // if (this.willValidate) {
    //   if (this.required && !this.checked) {
    //     // this.ariaInvalid = 'true'
    //     this.#internals.setValidity({ valueMissing: true },
    //       'Please check this box if you want to proceed.', this.#errorAnchor)
    //     // this.setAttribute('aria-errormessage', this.#internals.validationMessage)
    //     this.#invalidEvent = new CustomEvent('invalid', {
    //       bubbles: true,
    //       cancelable: true,
    //       composed: true
    //     })
    //     this.dispatchEvent(this.#invalidEvent)
    //     return false
    //   }
    // }
    // // this.ariaInvalid = 'false'
    // this.#internals.setValidity({})
    // // this.setAttribute('aria-errormessage', '')
    // return true
  }

  reportValidity() {
    this.ariaInvalid = String(!this.validity.valid)
    return this.#internals.reportValidity()
    // const result = this.checkValidity()
    // if (result) {
    //   this.#errorAnchor.textContent = ''
    // } else {
    //   this.#errorAnchor.textContent = this.#invalidEvent.defaultPrevented
    //     ? '' : this.#internals.validationMessage
    // }
    // return result
  }

  setCustomValidity(message) {
    // this.setAttribute('aria-errormessage', message)
    if (message) {
      // this.ariaInvalid = 'true'
      this.#internals.setValidity({ customError: true }, message, this.#errorAnchor)
    } else {
      // this.ariaInvalid = 'false'
      this.#internals.setValidity({})
    }
  }

  #messageElement
  #originalMessage = ''

  #updateValidity(keepValid) {
    if (this.checked) {
      this.#internals.setFormValue('on', 'checked')
    } else {
      this.#internals.setFormValue(null)
    }
    if (this.required && !this.checked) {
      this.#internals.setValidity({ valueMissing: true },
        'Please check this box if you want to proceed.', this.#errorAnchor)
        if (this.getAttribute('aria-invalid') === 'true') {
          this.#markInvalid()
        }
    } else {
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
    }
  }
}

customElements.define('piwo-checkbox', PiWoCheckbox)
