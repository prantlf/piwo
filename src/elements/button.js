import { findClosestAncestorByTagName, upgradeProperty } from '../shared/helpers.js'
import stylesheet from './button.css'

const booleanAttributes = [
  'disabled'
]
const stringAttributes = [
  'name', 'type'
]
const allAttributes = booleanAttributes.concat(stringAttributes)

class PiWoButton extends HTMLElement {
  #internals

  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'button'

    this.attachShadow({ mode: 'open' })
    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets = [stylesheet]

    this.addEventListener('click', event => this.#handleClick(event))
    this.addEventListener('keyup', event => this.#handleKeyUp(event))

    for (const name in allAttributes) {
      upgradeProperty(this, name)
    }
  }

  // ----- properties

  get form() {
    return this.#internals.form
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
    this.#type = value
    this.setAttribute('type', value)
  }

  get disabled() {
    return this.#internals.states.has('disabled')
  }

  set disabled(flag) {
    flag = !!flag
    if (flag === this.disabled) return
    if (flag) {
      this.#internals.states.add('disabled')
      const root = this.getRootNode()
      if (root.activeElement === this) {
        this.blur()
      }
      if (this.tabIndex >= 0) {
        this.tabIndex = -1
      }
    } else {
      this.#internals.states.delete('disabled')
      if (this.tabIndex < 0) {
        this.tabIndex = 0
      }
    }
    this.#internals.ariaDisabled = String(flag)
  }

  // ----- life-cycle callbacks

  static get observedAttributes() {
    return allAttributes
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (booleanAttributes.includes(name)) {
      this[name] = newValue != null
    } else {
      this[name] = newValue
    }
  }

  connectedCallback() {
    // not yet in internals - https://github.com/WICG/webcomponents/issues/762
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = this.disabled ? -1 : 0
    }
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
          switch (this.#type) {
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
      this.#internals.setFormValue(this.textContent.trim())
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
        this.#internals.setFormValue(null)
      }
      form.submitter = undefined
      submitter.remove()
    })
  }
}

customElements.define('piwo-button', PiWoButton)
