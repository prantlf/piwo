import { upgradeProperty } from '../shared/helpers.js'
import commonStylesheet from '../shared/common.css'
import thisStylesheet from './link.css'

const allAttributes = ['href', 'target', 'referrerpolicy', 'rel']
const propertyNames = {
  referrerpolicy: 'referrerPolicy'
}

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
    this.shadowRoot.adoptedStyleSheets = [commonStylesheet, thisStylesheet]

    this.addEventListener('click', event => this.#handleClick(event))
    this.addEventListener('keyup', event => this.#handleKeyUp(event))

    for (const attributeName in allAttributes) {
      const propertyName = propertyNames[attributeName] ?? attributeName
      upgradeProperty(this, propertyName)
    }
  }

  // ----- properties

  #href = ''

  get href() {
    return this.#href
  }

  set href(value) {
    if (value == null) value = ''
    if (value === this.#href) return
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

  #referrerPolicy = ''

  get referrerPolicy() {
    return this.#referrerPolicy
  }

  set referrerPolicy(value) {
    if (value == null) value = ''
    if (value === this.#referrerPolicy) return
    this.#referrerPolicy = value
    this.setAttribute('referrerpolicy', value)
  }

  #rel = ''

  get rel() {
    return this.#rel
  }

  set rel(value) {
    if (value == null) value = ''
    if (value === this.#rel) return
    this.#rel = value
    this.setAttribute('rel', value)
  }

  // ----- life-cycle callbacks

  static get observedAttributes() {
    return allAttributes
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    const propertyName = propertyNames[name] ?? name
    this[propertyName] = newValue
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
        const features = []
        if (this.#referrerPolicy.includes('no-referrer')) {
          features.push('noreferrer', 'noopener')
        } else {
          if (this.#rel.includes('noreferrer')) {
            features.push('noreferrer')
          }
          if (this.#rel.includes('noopener')) {
            features.push('noopener')
          }
        }
        window.open(this.#href, this.#target, features.join(''))
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
