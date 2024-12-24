import { AttributesMixin } from '../shared/attributes.js'
import { InternalsMixin, internals } from '../shared/internals.js'
import { ShadowMixin } from '../shared/shadow.js'
import { InteractiveMixin } from '../shared/interactive.js'
import { findClosestAncestorByTagName, onDisabledChange } from '../shared/helpers.js'
import thisStylesheet from './button.css'

class PiWoButton extends InteractiveMixin(ShadowMixin(InternalsMixin(AttributesMixin(HTMLElement, {
  attributes: {
    disabled: {
      type: 'boolean', aria: true, state: true, reflect: true,
      set(value) {
        onDisabledChange(this, value)
      }
    },
    name: { type: 'string', reflect: true },
    type: { type: 'string', reflect: true }
  }
})))) {
  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    this[internals].role = 'button'

    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)

    this.addEventListener('click', event => this.#handleClick(event))
    this.addEventListener('keyup', event => this.#handleKeyUp(event))
  }

  // ----- properties

  get form() {
    return this[internals].form
  }

  // ----- event handlers

  #handleClick(event) {
    if (!this.disabled &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)) {
      // give a chance to handlers registered outside of this element
      // to prevent the default behaviour
      setTimeout(() => {
        if (event.defaultPrevented) return
        // submit and reset buttons cannot be marked yet - https://github.com/WICG/webcomponents/issues/814
        const form = this.#getForm()
        if (form) {
          switch (this.type) {
            case 'reset':
              form.reset()
              break
            default: // '' and 'submit'
              this.#submitForm(form)
          }
        }
      })
    }
  }

  #handleKeyUp(event) {
    if (!this.disabled &&
        (event.keyCode === 13 || event.keyCode === 32) &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)) {
      this.click()
    }
  }

  // ----- submitting the connected form

  #getForm() {
    return this.form ?? findClosestAncestorByTagName(this, 'FORM')
  }

  #submitForm(form) {
    const { name } = this
    if (name) {
      this[internals].setFormValue(this.textContent.trim())
    }
    const submitter = document.createElement('input')
    submitter.button = this
    submitter.type = 'submit'
    this.insertAdjacentElement('afterend', submitter)
    form.submitter = submitter
    form.requestSubmit(submitter)
    // let submit handlers to create FormData with the submitter's name and value
    setTimeout(() => {
      if (name) {
        this[internals].setFormValue(null)
      }
      form.submitter = undefined
      submitter.remove()
    })
  }
}

customElements.define('piwo-button', PiWoButton)
