import { AttributesMixin } from '../shared/attributes.js'
import { ShadowMixin } from '../shared/shadow.js'
import thisStylesheet from './container.css'

class PiWoContainer extends ShadowMixin(AttributesMixin(HTMLElement)) {
  #slot

  constructor() {
    super()
    this.#slot = document.createElement('slot')
    this.shadowRoot.appendChild(this.#slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }
}

customElements.define('piwo-container', PiWoContainer)
