import { ElementMixin } from '../shared/element.js'
import { InternalsMixin, internals } from '../shared/internals.js'
import thisStylesheet from './p.css'

class PiWoParagraph extends InternalsMixin(ElementMixin(HTMLElement)) {
  constructor() {
    super()
    this[internals].role = 'paragraph'

    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }
}

customElements.define('piwo-p', PiWoParagraph)
