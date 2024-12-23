import { ElementMixin } from '../shared/element.js'
import thisStylesheet from './container.css'

class PiWoContainer extends ElementMixin(HTMLElement) {
  #slot

  constructor() {
    super()
    this.#slot = document.createElement('slot')
    this.shadowRoot.appendChild(this.#slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }
}

customElements.define('piwo-container', PiWoContainer)
