import { ElementMixin } from '../shared/element.js'
import { InternalsMixin, internals } from '../shared/internals.js'
import { InteractiveMixin } from '../shared/interactive.js'
import thisStylesheet from './link.css'

class PiWoLink extends InteractiveMixin(InternalsMixin(ElementMixin(HTMLElement, {
  attributes: {
    href: { type: 'string', reflect: true },
    target: { type: 'string', reflect: true },
    referrerpolicy: { type: 'string', property: 'referrerPolicy', reflect: true },
    rel: { type: 'string', reflect: true }
  }
}))) {
  constructor() {
    super()
    this[internals].role = 'link'

    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets.push(thisStylesheet)

    this.addEventListener('click', event => this.#handleClick(event))
    this.addEventListener('keyup', event => this.#handleKeyUp(event))
  }

  // ----- event handlers

  #handleClick(event) {
    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return
    // give a chance to handlers registered outside of this element
    // to prevent the default behaviour
    setTimeout(() => {
      if (event.defaultPrevented) return
      if (this.target) {
        const features = []
        if (this.referrerPolicy.includes('no-referrer')) {
          features.push('noreferrer', 'noopener')
        } else {
          if (this.rel.includes('noreferrer')) {
            features.push('noreferrer')
          }
          if (this.rel.includes('noopener')) {
            features.push('noopener')
          }
        }
        window.open(this.href, this.target, features.join(''))
      } else {
        location.href = this.href
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
