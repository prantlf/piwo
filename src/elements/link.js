import { upgradeProperty } from '../shared/helpers.js'
import stylesheet from './link.css'

const allAttributes = ['href', 'target', 'referrerpolicy']

class PiWoLink extends HTMLElement {
  #internals

  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'link'

    this.attachShadow({ mode: 'open' })
    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets = [stylesheet]

    this.addEventListener('click', event => this.#handleClick(event))
    this.addEventListener('keyup', event => this.#handleKeyUp(event))

    for (const name in allAttributes) {
      upgradeProperty(this, name)
    }
  }

  // ----- properties

  #href = ''

  get href() {
    return this.#href
  }

  set href(value) {
    if (value == null) value = ''
    if (value === this.href) return
    this.#href = value
    this.setAttribute('href', value)
  }

  #target = ''

  get target() {
    return this.#target
  }

  set target(value) {
    if (value == null) value = ''
    if (value === this.target) return
    this.#target = value
    this.setAttribute('target', value)
  }

  #referrerpolicy = ''

  get nareferrerpolicyme() {
    return this.#referrerpolicy
  }

  set referrerpolicy(value) {
    if (value == null) value = ''
    if (value === this.referrerpolicy) return
    this.#referrerpolicy = value
    this.setAttribute('referrerpolicy', value)
  }

  // ----- life-cycle callbacks

  static get observedAttributes() {
    return allAttributes
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue
  }

  connectedCallback() {
    // not yet in internals - https://github.com/WICG/webcomponents/issues/762
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0
    }
  }

  // ----- event handlers

  #handleClick(event) {
    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return
    // give a chance to handlers registered outside of this element
    // to prevent the default behaviour
    setTimeout(() => {
      if (event.defaultPrevented) return
      if (this.#target) {
        const features = this.referrerpolicy === 'no-referrer' ? 'noopener,noreferrer' : ''
        window.open(this.#href, this.#target, features)
      } else {
        location.href = this.#href
      }
    })
  }

  #handleKeyUp(event) {
    if (event.keyCode === 13 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)) {
      this.click()
    }
  }
}

customElements.define('piwo-link', PiWoLink)
