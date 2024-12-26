import { BooleanMixin, updateValidity } from '../shared/boolean.js'
import { internals } from '../shared/internals.js'
import { ensureMessageElement } from '../shared/helpers.js'
import thisStylesheet from './switch.css'

class PiWoSwitch extends BooleanMixin({
  checked: {
    type: 'boolean', aria: true, state: true,
    set() {
      this[updateValidity]()
    }
  }
}) {
  constructor() {
    super()
    this[internals].role = 'switch'

    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }

  // ----- life-cycle callbacks

  connectedCallback() {
    super.connectedCallback()
    const keepValid = this.getAttribute('aria-invalid') === 'false'
    this.checked = this.defaultChecked
    this[updateValidity](keepValid)
    if (this.validity.valid) {
      ensureMessageElement(this)
    }
  }
}

customElements.define('piwo-switch', PiWoSwitch)
