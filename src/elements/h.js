import { createStylesheet, upgradeProperty } from '../shared/helpers.js'

const stylesheet = createStylesheet(`
:host {
  --pico-font-weight: 700;
  display: block;
  margin-top: 0;
  margin-bottom: var(--pico-typography-spacing-vertical);
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  font-size: var(--pico-font-size);
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
}

:host([level="1"]) {
  --pico-font-size: 2rem;
  --pico-line-height: 1.125;
  --pico-typography-spacing-top: 3rem;
  --pico-color: var(--pico-h1-color);
}

:host([level="2"]) {
  --pico-font-size: 1.75rem;
  --pico-line-height: 1.15;
  --pico-typography-spacing-top: 2.625rem;
  --pico-color: var(--pico-h2-color);
}

:host([level="3"]) {
  --pico-font-size: 1.5rem;
  --pico-line-height: 1.175;
  --pico-typography-spacing-top: 2.25rem;
  --pico-color: var(--pico-h3-color);
}

:host([level="4"]) {
  --pico-font-size: 1.25rem;
  --pico-line-height: 1.2;
  --pico-typography-spacing-top: 1.874rem;
  --pico-color: var(--pico-h4-color);
}

:host([level="5"]) {
  --pico-font-size: 1.125rem;
  --pico-line-height: 1.225;
  --pico-typography-spacing-top: 1.6875rem;
  --pico-color: var(--pico-h5-color);
}

:host([level=6]) {
  --pico-font-size: 1rem;
  --pico-line-height: 1.25;
  --pico-typography-spacing-top: 1.5rem;
  --pico-color: var(--pico-h6-color);
}

:host([hidden]) {
  display: none;
}
`)

class PiWoHeading extends HTMLElement {
  #internals

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'heading'

    this.attachShadow({ mode: 'open' })
    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets = [stylesheet]

    upgradeProperty(this, 'level')
  }

  // ----- properties

  #level = ''

  get level() {
    return this.#level
  }

  set level(value) {
    if (value == null) value = ''
    if (value === this.level) return
    this.#internals.ariaLevel = value
    this.toggleAttribute('level', value)
  }

  // ----- life-cycle callbacks

  static get observedAttributes() {
    return ['level']
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue
  }
}

customElements.define('piwo-h', PiWoHeading)
