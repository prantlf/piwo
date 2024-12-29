import { AttributesMixin } from '../shared/attributes.js'
import { InternalsMixin, internals } from '../shared/internals.js'
import { ShadowMixin } from '../shared/shadow.js'
import { setCustomError } from '../shared/helpers.js'
import thisStylesheet from './fieldset.css'

let counter = 0

class PiWoFieldSet extends ShadowMixin(InternalsMixin(AttributesMixin(HTMLElement, {
  attributes: {
    disabled: { type: 'boolean', aria: true, state: true, reflect: true },
    name: { type: 'string', reflect: true }
  }
}))) {
  #slot

  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    this[internals].role = 'group'

    this.#slot = document.createElement('slot')
    this.shadowRoot.appendChild(this.#slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)

    this.#slot.addEventListener('slotchange', () => this.#updateLegend())
  }

  // ----- properties

  get form() {
    return this[internals].form
  }

  get type() {
    return this.localName
  }

  get elements() {
    const descendants = this.querySelectorAll('*')
    return Array
      .from(descendants)
      .filter(el => el.formAssociated && (el.value !== undefined || el.checked !== undefined))
  }

  // ----- form validation

  get willValidate() {
    return false
  }

  get validity() {
    return this[internals].validity
  }

  get validationMessage() {
    return this[internals].validationMessage
  }

  checkValidity() {
    return true
  }

  reportValidity() {
    return true
  }

  setCustomValidity(message) {
    setCustomError(this, this[innerInput], message)
  }

  // ----- connecting a legend to a fieldset

  async #updateLegend() {
    await Promise.resolve()
    const oldTarget = this.#getConnectedLegend()
    const newTarget = this.#getIncludedLegend()
    if (!newTarget || oldTarget === newTarget) return
    if (oldTarget) {
      this.removeAttribute('aria-labelledby')
    }
    if (!newTarget.id) {
      newTarget.id = `legend${counter++}`
    }
    this.setAttribute('aria-labelledby', newTarget.id)
  }

  #getConnectedLegend() {
    const id = this.getAttribute('aria-labelledby')
    if (!id) return null
    const root = this.getRootNode()
    return root.getElementById(id)
  }

  #getIncludedLegend() {
    const children = this.#slot.assignedElements({ flatten: true })
    const legend = children.find(({ tagName }) => tagName === 'PIWO-LEGEND')
    return legend
  }
}

customElements.define('piwo-fieldset', PiWoFieldSet)
