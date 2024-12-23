import { internals } from './element.js'
import { findLabels, markInvalid } from './helpers.js'

const FieldMixin = ParentElement => {
  class FieldElement extends ParentElement {
    static get formAssociated() {
      return true
    }

    constructor() {
      super()

      this.addEventListener('invalid', event => this.#handleInvalid(event))
    }

    // ----- properties

    get form() {
      return this[internals].form
    }

    get labels() {
      const labels = this[internals].labels
      if (labels.length) return labels
      return findLabels(this)
    }

    // ----- life-cycle callbacks

    static get observedAttributes() {
      return observedAttributeNames
    }

    attributeChangedCallback(name, _oldValue, newValue) {
      const { property, boolean } = attributes[name]
      this[property ?? name] = boolean ? newValue != null : newValue
    }
  
    connectedCallback() {
      // not yet in internals - https://github.com/WICG/webcomponents/issues/762
      if (interactive && !this.hasAttribute('tabindex')) {
        this.tabIndex = this.disabled ? -1 : 0
      }
    }

    // ----- event handlers

    #handleInvalid(event) {
      // detect if `reportValidity` was called from a user interaction
      if (event.explicitOriginalTarget && event.explicitOriginalTarget !== this || this.form.submitter) {
        this.ariaInvalid = 'true'
        if (this.describeError) {
          event.preventDefault()
          markInvalid(this)
        }
      }
    }

    // ----- form validation

    get willValidate() {
      return this[internals].willValidate
    }

    get validity() {
      return this[internals].validity
    }

    get validationMessage() {
      return this[internals].validationMessage
    }

    // #invalidEvent

    checkValidity() {
      return this[internals].checkValidity()
      // if (this.willValidate) {
      //   if (this.required && !this.checked) {
      //     // this.ariaInvalid = 'true'
      //     this[internals].setValidity({ valueMissing: true },
      //       'Please check this box if you want to proceed.', this.#errorAnchor)
      //     // this.setAttribute('aria-errormessage', this[internals].validationMessage)
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
      // this[internals].setValidity({})
      // // this.toggleAttribute('aria-errormessage', true)
      // return true
    }

    reportValidity() {
      this.ariaInvalid = String(!this.validity.valid)
      return this[internals].reportValidity()
      // const result = this.checkValidity()
      // if (result) {
      //   this.#errorAnchor.textContent = ''
      // } else {
      //   this.#errorAnchor.textContent = this.#invalidEvent.defaultPrevented
      //     ? '' : this[internals].validationMessage
      // }
      // return result
    }
  }

  return FieldElement
}

export { FieldMixin }
