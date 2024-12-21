import stylesheet from './hr.css'

class PiWoHorizontalRule extends HTMLElement {
  #internals

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'separator'

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [stylesheet]
  }
}

customElements.define('piwo-hr', PiWoHorizontalRule)
