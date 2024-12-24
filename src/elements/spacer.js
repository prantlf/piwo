import { AttributesMixin } from '../shared/attributes.js'
import { ShadowMixin } from '../shared/shadow.js'
import thisStylesheet from './spacer.css'

const updateSpace = Symbol('updateSpace')

class PiWoSpacer extends ShadowMixin(AttributesMixin(HTMLElement, {
  attributes: {
    factor: {
      type: 'number', reflect: true,
      set() {
        this[updateSpace]() 
      }
    },
    typography: { type: 'boolean', reflect: true }
  }
})) {
  constructor() {
    super()

    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }

  [updateSpace]() {
    if (this.factor !== 1) {
      this.style.setProperty('--pico-spacing-factor', this.factor)
    } else {
      this.style.removeProperty('--pico-spacing-factor')
    }
  }
}

customElements.define('piwo-spacer', PiWoSpacer)
