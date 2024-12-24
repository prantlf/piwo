import { AttributesMixin } from '../shared/attributes.js'
import { InternalsMixin, internals } from '../shared/internals.js'
import { ShadowMixin } from '../shared/shadow.js'
import thisStylesheet from './hr.css'

class PiWoHorizontalRule extends ShadowMixin(InternalsMixin(AttributesMixin(HTMLElement))) {
  constructor() {
    super()
    this[internals].role = 'separator'

    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }
}

customElements.define('piwo-hr', PiWoHorizontalRule)
