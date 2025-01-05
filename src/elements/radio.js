import { BooleanMixin, updateValidity, handleClick, errorAnchor } from '../shared/boolean.js'
import { internals } from '../shared/internals.js'
import { ensureMessageElement, markInvalid, markValid } from '../shared/helpers.js'
import thisStylesheet from './radio.css'

class PiWoRadio extends BooleanMixin({
  value: { type: 'string', reflect: true },
  checked: {
    type: 'boolean', aria: true, state: true,
    set(value) {
      if (value) {
        uncheckOtherRadio(this)
      }
      this[updateValidity]()
    }
  }
}) {
  constructor() {
    super()
    this[internals].role = 'radio'

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

  formStateRestoreCallback(state, _mode) { // restore or autocomplete
    this.checked = state === this.value
  }

  // ----- event handlers

  [handleClick](event) {
    if (this.checked) return
    return super[handleClick](event)
  }

  [updateValidity](keepValid) {
    if (this.checked) {
      this[internals].setFormValue(this.value, this.value)
    } else {
      this[internals].setFormValue(null)
    }

    const required = getRequiredRadios(this)
    if (required.length) {
      const checked = getCheckedRadios(this)
      if (!checked.length) {
        this[internals].setValidity({ valueMissing: true },
          'Please check one of these boxes if you want to proceed.', this[errorAnchor])
        if (this.getAttribute('aria-invalid') === 'true') {
          markInvalid(this)
        }
        return
      }
    }

    this[internals].setValidity({})
    this.ariaInvalid = keepValid ? 'false': null
    markValid(this)
  }
}

function getRequiredRadios(radio) {
  return getRadios(radio, '[required]')
}

function getCheckedRadios(radio) {
  return getRadios(radio, ':state(checked)')
}

function getRadios(radio, state) {
  const source = radio.form ?? document
  const radios = source.querySelectorAll(`piwo-radio[name="${radio.name}"]${state}`)
  return radios
}

function uncheckOtherRadio(radio) {
  const radios = getCheckedRadios(radio)
  for (const otherRadio of radios) {
    if (otherRadio === radio) continue
    otherRadio.checked = false
    otherRadio.dispatchEvent(new CustomEvent('input', {
      bubbles: true,
      cancelable: false,
      composed: true
    }))
    otherRadio.dispatchEvent(new CustomEvent('change', {
      detail: {
        checked: false,
      },
      bubbles: true,
      cancelable: false,
      composed: true
    }))
    break
  }
}

customElements.define('piwo-radio', PiWoRadio)
