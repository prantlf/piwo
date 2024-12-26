import { AttributesMixin } from './attributes.js'
import { InternalsMixin, internals } from './internals.js'
import { ShadowMixin } from './shadow.js'
import { InteractiveMixin } from './interactive.js'
import { FieldMixin } from './field.js'
import { createErrorAnchor, markInvalid, markValid, onDisabledChange, setCustomError } from './helpers.js'
import stylesheet from './boolean.css'

const updateValidity = Symbol('updateValidity')
const handleClick = Symbol('handleClick')

const BooleanMixin = attributes => {
  class BooleanElement extends FieldMixin(InteractiveMixin(ShadowMixin(InternalsMixin(AttributesMixin(HTMLElement, {
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
    defaultChecked: { type: 'boolean', attribute: 'checked', reflect: true },
    ...attributes
  }
  }))))) {
    #errorAnchor

    constructor() {
      super()
      this[internals].ariaChecked = 'false'

      this.shadowRoot.adoptedStyleSheets.push(stylesheet)
      this.#errorAnchor = createErrorAnchor(this)

      // this.#errorAnchor.addEventListener('focus', () => this.focus())
      this.addEventListener('click', event => this[handleClick](event))
      this.addEventListener('keyup', event => this.#handleKeyUp(event))
    }

    // ----- properties

    get type() {
      return this.localName
    }

    // ----- life-cycle callbacks

    formResetCallback() {
      this.checked = this.defaultChecked
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

    [handleClick](event) {
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

    setCustomValidity(message) {
      // this.setAttribute('aria-errormessage', message)
      // this.ariaInvalid = 'true' / 'false'
      setCustomError(this, this.#errorAnchor, message)
    }

    [updateValidity](keepValid) {
      if (this.checked) {
        this[internals].setFormValue('on', 'checked')
      } else {
        this[internals].setFormValue(null)
      }
      if (this.required && !this.checked) {
        this[internals].setValidity({ valueMissing: true },
          'Please check this box if you want to proceed.', this.#errorAnchor)
        if (this.getAttribute('aria-invalid') === 'true') {
          markInvalid(this)
        }
      } else {
        this[internals].setValidity({})
        this.ariaInvalid = keepValid ? 'false': null
        markValid(this)
      }
    }
  }

  return BooleanElement
}

export { BooleanMixin, updateValidity, handleClick }
