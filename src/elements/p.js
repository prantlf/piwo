import { createStylesheet } from '../shared/helpers.js'
import styles from './p.css'

const stylesheet = createStylesheet(styles)

class PiWoParagraph extends HTMLElement {
  #internals

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'paragraph'

    this.attachShadow({ mode: 'open' })
    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets = [stylesheet]
  }
}

customElements.define('piwo-p', PiWoParagraph)
