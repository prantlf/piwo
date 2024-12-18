import { createStylesheet, upgradeProperty } from '../shared/helpers.js'
import styles from './h.css'

const stylesheet = createStylesheet(styles)

class PiWoHeading extends HTMLElement {
  #internals

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'heading'

    this.attachShadow({ mode: 'open' })
    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets = [stylesheet]

    upgradeProperty(this, 'level')
  }

  // ----- properties

  #level = ''

  get level() {
    return this.#level
  }

  set level(value) {
    if (value == null) value = ''
    if (value === this.level) return
    this.#internals.ariaLevel = value
    this.toggleAttribute('level', value)
  }

  // ----- life-cycle callbacks

  static get observedAttributes() {
    return ['level']
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue
  }
}

customElements.define('piwo-h', PiWoHeading)
