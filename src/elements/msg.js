import { createStylesheet } from '../shared/helpers.js'

const stylesheet = createStylesheet(`
:host {
  --pico-font-size: 0.875em;
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  font-size: var(--pico-font-size);
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
  text-underline-offset: var(--pico-text-underline-offset);
  text-rendering: optimizeLegibility;
  overflow-wrap: break-word;
  tab-size: 4;
  box-sizing: border-box;
  background-repeat: no-repeat;
}

:host([hidden]) {
  display: none;
}

@media (min-width: 768px) {
  --pico-block-spacing-vertical: calc(var(--pico-spacing) * 1.5);
  --pico-block-spacing-horizontal: calc(var(--pico-spacing) * 1.5);
}
@media (min-width: 576px) {
  --pico-block-spacing-vertical: calc(var(--pico-spacing) * 1.25);
  --pico-block-spacing-horizontal: calc(var(--pico-spacing) * 1.25);
}
`)

class PiWoMessage extends HTMLElement {
  #slot

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.#slot = document.createElement('slot')
    this.shadowRoot.appendChild(this.#slot)
    this.shadowRoot.adoptedStyleSheets = [stylesheet]
  }
}

customElements.define('piwo-msg', PiWoMessage)
