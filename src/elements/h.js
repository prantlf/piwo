import { ElementMixin } from '../shared/element.js'
import { InternalsMixin, internals } from '../shared/internals.js'
import thisStylesheet from './h.css'

class PiWoHeading extends InternalsMixin(ElementMixin(HTMLElement, {
  attributes: {
    level: { type: 'string', aria: true, reflect: true }
  }
})) {
  constructor() {
    super()
    this[internals].role = 'heading'

    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }
}

customElements.define('piwo-h', PiWoHeading)
