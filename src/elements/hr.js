import commonStylesheet from '../shared/common.css'
import thisStylesheet from './hr.css'

class PiWoHorizontalRule extends HTMLElement {
  #internals

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'separator'

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [commonStylesheet, thisStylesheet]
  }
}

customElements.define('piwo-hr', PiWoHorizontalRule)
