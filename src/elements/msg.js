import { createStylesheet } from '../shared/helpers.js'

import styles from './msg.css'

const stylesheet = createStylesheet(styles)

class PiWoMessage extends HTMLElement {
  #slot

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.#slot = document.createElement('slot')
    this.shadowRoot.appendChild(this.#slot)
    this.shadowRoot.adoptedStyleSheets = [stylesheet]
  }
}

customElements.define('piwo-msg', PiWoMessage)
