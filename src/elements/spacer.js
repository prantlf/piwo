import { upgradeProperty } from '../shared/helpers.js'
import stylesheet from './spacer.css'

class PiWoSpacer extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [stylesheet]

    upgradeProperty(this, 'factor')
    upgradeProperty(this, 'typography')
  }

  // ----- properties

  #factor = 1

  get factor() {
    return this.#factor
  }

  set factor(value) {
    if (value == null) {
      value = 1
    } else {
      value = +value
      if (Number.isNaN(value)) {
        value = 1
      }
    }
    if (value === this.factor) return
    this.#factor = value
    this.setAttribute('factor', String(value))
    this.#updateSpace()
  }

  #typography = false

  get typography() {
    return this.#typography
  }

  set typography(value) {
    value = Boolean(value)
    if (value === this.typography) return
    this.#typography = value
    this.toggleAttribute('typography', value)
  }

  // ----- life-cycle callbacks

  static get observedAttributes() {
    return ['factor', 'typography']
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue
  }

  #updateSpace() {
    if (this.factor !== 1) {
      this.style.setProperty('--pico-spacing-factor', this.factor)
    } else {
      this.style.removeProperty('--pico-spacing-factor')
    }
  }
}

customElements.define('piwo-spacer', PiWoSpacer)
