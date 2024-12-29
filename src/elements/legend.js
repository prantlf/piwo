import { ShadowMixin } from '../shared/shadow.js'
import { findClosestAncestorByTagName } from '../shared/helpers.js'
import thisStylesheet from './legend.css'

class PiWoLegend extends ShadowMixin(HTMLElement) {
  static get formAssociated() {
    return true
  }

  constructor() {
    super()

    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }

  // ----- properties

  get form() {
    const fieldSet = findClosestAncestorByTagName(this, 'PIWO-FIELDSET')
    return fieldSet?.form
  }
}

customElements.define('piwo-legend', PiWoLegend)
