import { AttributesMixin } from '../shared/attributes.js'
import { ShadowMixin } from '../shared/shadow.js'
import thisStylesheet from './label.css'

const updateLabel = Symbol('updateLabel')
let counter = 0

class PiWoLabel extends ShadowMixin(AttributesMixin(HTMLElement, {
  attributes: {
    for: {
      type: 'string', property: 'htmlFor', reflect: true,
      set() {
        this[updateLabel]() 
      }
    }
  }
})) {
  #slot

  constructor() {
    super()
    this.#slot = document.createElement('slot')
    this.shadowRoot.appendChild(this.#slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)

    this.#slot.addEventListener('slotchange', () => this[updateLabel]())
    this.addEventListener('click', event => this.#handleClick(event))
  }

  // ----- event handlers

  #handleClick(event) {
    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return
    const labelledTarget = this.#getLabelledTarget()
    if (!labelledTarget || labelledTarget.disabled || event.target === labelledTarget) return
    labelledTarget.focus()
    labelledTarget.click()
  }

  // ----- connecting the label to a field

  async [updateLabel]() {
    // let the caller create the full markup after setting the `for` attribute
    await Promise.resolve()
    if (!this.id) {
      this.id = `label${counter++}`
    }
    const oldTarget = this.#getLabelledTarget()
    const newTarget = this.#getPointedTarget()
    if (!newTarget || oldTarget === newTarget) return
    if (oldTarget) {
      oldTarget.removeAttribute('aria-labelledby')
    }
    newTarget.setAttribute('aria-labelledby', this.id)
  }

  #getLabelledTarget() {
    const root = this.getRootNode()
    return root.querySelector(`[aria-labelledby="${this.id}"]`)
  }

  #getPointedTarget() {
    // label cannot be delegated yet - https://github.com/WICG/webcomponents/issues/917
    const targetId = this.htmlFor
    if (targetId) {
      const scope = this.getRootNode()
      return scope.getElementById(targetId)
    }
    const children = this.#slot.assignedElements({ flatten: true })
    const input = children.find(({ labels }) => labels)
    return input ?? children[0]
  }
}

customElements.define('piwo-label', PiWoLabel)
