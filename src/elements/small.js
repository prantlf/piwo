import commonStylesheet from '../shared/common.css'
import thisStylesheet from './small.css'

class PiWoSmall extends HTMLElement {
  #slot

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.#slot = document.createElement('slot')
    this.shadowRoot.appendChild(this.#slot)
    this.shadowRoot.adoptedStyleSheets = [commonStylesheet, thisStylesheet]
  }
}

customElements.define('piwo-small', PiWoSmall)
