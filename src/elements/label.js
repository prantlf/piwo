import { createStylesheet, upgradeProperty } from '../shared/helpers.js'

const stylesheet = createStylesheet(`
:host {
  font-size: var(--pico-font-size);
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
  text-underline-offset: var(--pico-text-underline-offset);
  text-rendering: optimizeLegibility;
  overflow-wrap: break-word;
  tab-size: 4;
  display: block;
  margin-bottom: calc(var(--pico-spacing) * .375);
  color: var(--pico-color);
  font-weight: var(--pico-form-label-font-weight, var(--pico-font-weight));
  box-sizing: border-box;
  background-repeat: no-repeat;
  cursor: default;
}

:host([aria-disabled=true]) {
  opacity: var(--pico-form-element-disabled-opacity);
  pointer-events: none;
}

:host([hidden]) {
  display: none;
}
`)

let counter = 0

class PiWoLabel extends HTMLElement {
  #slot

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.#slot = document.createElement('slot')
    this.shadowRoot.appendChild(this.#slot)
    this.shadowRoot.adoptedStyleSheets = [stylesheet]

    this.#slot.addEventListener('slotchange', () => this.#updateLabel())
    this.addEventListener('click', event => this.#handleClick(event))

    upgradeProperty(this, 'htmlFor')
  }

  // ----- properties

  #for = ''

  get htmlFor() {
    return this.#for
  }

  set htmlFor(value) {
    if (value == null) value = ''
    if (value === this.htmlFor) return
    this.#for = value
    this.setAttribute('for', value)
    this.#updateLabel()
  }

  // ----- life-cycle callbacks

  static get observedAttributes() {
    return ['for']
  }

  attributeChangedCallback(_name, _oldValue, newValue) {
    this.htmlFor = newValue
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

  async #updateLabel() {
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
