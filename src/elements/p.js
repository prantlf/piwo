import { ElementMixin, internals } from '../shared/element.js'
import thisStylesheet from './p.css'

class PiWoParagraph extends ElementMixin(HTMLElement, {
  internals: true
}) {
  constructor() {
    super()
    this[internals].role = 'paragraph'

    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }
}

customElements.define('piwo-p', PiWoParagraph)
