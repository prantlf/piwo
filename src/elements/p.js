import commonStylesheet from '../shared/common.css'
import thisStylesheet from './p.css'

class PiWoParagraph extends HTMLElement {
  #internals

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'paragraph'

    this.attachShadow({ mode: 'open' })
    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets = [commonStylesheet, thisStylesheet]
  }
}

customElements.define('piwo-p', PiWoParagraph)
