import { BooleanMixin, updateValidity } from '../shared/boolean.js'
import { internals } from '../shared/internals.js'
import { ensureMessageElement } from '../shared/helpers.js'
import thisStylesheet from './checkbox.css'

class PiWoCheckbox extends BooleanMixin({
  checked: {
    type: 'boolean', aria: true, state: true,
    set() {
      this[internals].states.delete('indeterminate')
      this[updateValidity]()
    }
  },
  indeterminate: {
    type: 'boolean', state: true,
    set(value) {
      if (value) {
        this[internals].ariaChecked = 'mixed'
      } else {
        this[internals].ariaChecked = String(this.checked)
      }
    }
  }
}) {
  constructor() {
    super()
    this[internals].role = 'checkbox'

    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)
  }

  // ----- life-cycle callbacks

  connectedCallback() {
    super.connectedCallback()
    const keepValid = this.getAttribute('aria-invalid') === 'false'
    this.checked = this.defaultChecked
    if (this.hasAttribute('indeterminate')) {
      this.indeterminate = true
    }
    this[updateValidity](keepValid)
    if (this.validity.valid) {
      ensureMessageElement(this)
    }
  }
}

customElements.define('piwo-checkbox', PiWoCheckbox)
