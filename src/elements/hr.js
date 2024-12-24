import { ElementMixin } from '../shared/element.js'
import { InternalsMixin, internals } from '../shared/internals.js'
import thisStylesheet from './hr.css'

class PiWoHorizontalRule extends InternalsMixin(ElementMixin(HTMLElement)) {
  constructor() {
    super()
    this[internals].role = 'separator'

    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }
}

customElements.define('piwo-hr', PiWoHorizontalRule)
