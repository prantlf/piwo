import { AttributesMixin } from '../shared/attributes.js'
import { InternalsMixin, internals } from '../shared/internals.js'
import { ShadowMixin } from '../shared/shadow.js'
import thisStylesheet from './h.css'

class PiWoHeading extends ShadowMixin(InternalsMixin(AttributesMixin(HTMLElement, {
  attributes: {
    level: { type: 'string', aria: true, reflect: true }
  }
}))) {
  constructor() {
    super()
    this[internals].role = 'heading'

    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }
}

customElements.define('piwo-h', PiWoHeading)
