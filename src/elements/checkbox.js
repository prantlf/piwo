import { createStylesheet, findLabels, upgradeProperty } from '../shared/helpers.js'

const stylesheet = createStylesheet(`
:host {
  --pico-background-color: var(--pico-form-element-background-color);
  --pico-border-color: var(--pico-form-element-border-color);
  --pico-color: var(--pico-form-element-color);
  --pico-box-shadow: none;
  --pico-outline-width: 0.0625rem;
  --pico-border-width: 0.125rem;
  --pico-form-element-focus-color: var(--pico-primary-focus);
  box-sizing: border-box;
  background-repeat: no-repeat;
  display: inline-block;
  margin: 0;
  font-size: 1rem;
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
  letter-spacing: inherit;
  overflow: visible;
  border: var(--pico-border-width) solid var(--pico-border-color);
  border-radius: var(--pico-border-radius);
  outline: none;
  background-color: var(--pico-background-color);
  box-shadow: var(--pico-box-shadow);
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  transition: background-color var(--pico-transition), border-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);
  accent-color: var(--pico-primary);
  padding: 0;
  appearance: none;
  width: 1.25em;
  height: 1.25em;
  margin-top: -0.25em;
  margin-inline-end: 0.5em;
  border-width: var(--pico-border-width);
  vertical-align: middle;
  cursor: pointer;
}

:host(:is(:active, :focus)) {
  --pico-background-color: var(--pico-form-element-active-background-color);
  --pico-border-color: var(--pico-form-element-active-border-color);
}

:host(:focus) {
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-form-element-focus-color);
}

:host([aria-invalid=false]:focus) {
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-ins-color);
}

:host([aria-invalid=true]:focus) {
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-del-color);
}

/*:host(:focus-visible) {
  outline: 2px solid #00f;
  outline-offset: 3px;
}*/

:host(:disabled), :host(:state(readonly)) {
  opacity: var(--pico-form-element-disabled-opacity);
  pointer-events: none;
  cursor: default;
}

:host([aria-invalid=false]) {
  --pico-border-color: var(--pico-form-element-valid-border-color);
}

:host([aria-invalid=false]:is(:active, :focus)) {
  --pico-border-color: var(--pico-form-element-valid-active-border-color) !important;
}

:host([aria-invalid=true]) {
  --pico-border-color: var(--pico-form-element-invalid-border-color);
}

:host([aria-invalid=true]:is(:active, :focus)) {
  --pico-border-color: var(--pico-form-element-invalid-active-border-color) !important;
}

:host([hidden]) {
  display: none;
}

:host(:state(checked)), :host(:state(checked):active), :host(:state(checked):focus) {
  --pico-background-color: var(--pico-primary-background);
  --pico-border-color: var(--pico-primary-border);
  background-image: var(--pico-icon-checkbox);
  background-position: center;
  background-size: 0.75em auto;
  background-repeat: no-repeat;
}

:host(:state(indeterminate)) {
  --pico-background-color: var(--pico-primary-background);
  --pico-border-color: var(--pico-primary-border);
  background-image: var(--pico-icon-minus);
  background-position: center;
  background-size: 0.75em auto;
  background-repeat: no-repeat;
}

:host(:state(checked)[aria-invalid=false]),
:host(:state(checked)[aria-invalid=false]:active),
:host(:state(checked)[aria-invalid=false]:focus) {
  --pico-background-color: var(--pico-form-element-valid-border-color);
  --pico-border-color: var(--pico-form-element-valid-border-color);
}

:host(:state(checked)[aria-invalid=true]),
:host(:state(checked)[aria-invalid=true]:active),
:host(:state(checked)[aria-invalid=true]:focus) {
  --pico-background-color: var(--pico-form-element-invalid-border-color);
  --pico-border-color: var(--pico-form-element-invalid-border-color);
}

@media (prefers-reduced-motion: reduce) {
  :host(:not([aria-busy=true])), :host(:not([aria-busy=true]))::after, :host(:not([aria-busy=true]))::before {
    background-attachment: initial !important;
    animation-duration: 1ms !important;
    animation-delay: -1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-delay: 0s !important;
    transition-duration: 0s !important;
  }
}

input {
  display: none;
}

:host(:invalid) input {
  display: inline-block;
  width: 0;
  height: 0;
  padding: 0;
  border: none;
}
`)

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
