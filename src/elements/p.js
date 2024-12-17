import { createStylesheet } from '../shared/helpers.js'

const stylesheet = createStylesheet(`
:host {
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  font-size: var(--pico-font-size);
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
  text-underline-offset: var(--pico-text-underline-offset);
  text-rendering: optimizeLegibility;
  overflow-wrap: break-word;
  tab-size: 4;
  margin-bottom: var(--pico-typography-spacing-vertical);
  margin-top: 0;
  margin-bottom: var(--pico-typography-spacing-vertical);
  color: var(--pico-color);
  font-style: normal;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;

  @media (min-width: 768px) {
    --pico-block-spacing-vertical: calc(var(--pico-spacing) * 1.5);
  }
  @media (min-width: 576px) {
    --pico-block-spacing-vertical: calc(var(--pico-spacing) * 1.25);
  }
}

:host([hidden]) {
  display: none;
}
`)

class PiWoParagraph extends HTMLElement {
  #internals

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'paragraph'

    this.attachShadow({ mode: 'open' })
    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets = [stylesheet]
  }
}

customElements.define('piwo-p', PiWoParagraph)
