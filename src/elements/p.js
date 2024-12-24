import { AttributesMixin } from '../shared/attributes.js'
import { InternalsMixin, internals } from '../shared/internals.js'
import { ShadowMixin } from '../shared/shadow.js'
import thisStylesheet from './p.css'

class PiWoParagraph extends ShadowMixin(InternalsMixin(AttributesMixin(HTMLElement))) {
  constructor() {
    super()
    this[internals].role = 'paragraph'

    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }
}

customElements.define('piwo-p', PiWoParagraph)
