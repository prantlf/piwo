import { ElementMixin, internals } from '../shared/element.js'
import thisStylesheet from './hr.css'

class PiWoHorizontalRule extends ElementMixin(HTMLElement, {
  internals: true
}) {
  constructor() {
    super()
    this[internals].role = 'separator'

    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }
}

customElements.define('piwo-hr', PiWoHorizontalRule)
