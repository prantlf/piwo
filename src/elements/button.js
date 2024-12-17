import { createStylesheet, findClosestAncestorByTagName, upgradeProperty } from '../shared/helpers.js'

const stylesheet = createStylesheet(`
:host {
  --pico-outline-width: 0.0625rem;
  --pico-background-color: var(--pico-primary-background);
  --pico-border-color: var(--pico-primary-border);
  --pico-color: var(--pico-primary-inverse);
  --pico-box-shadow: var(--pico-button-box-shadow, 0 0 0 rgba(0, 0, 0, 0));
  margin: 0;
  overflow: visible;
  font-family: var(--pico-font-family);
  text-transform: none;
  appearance: button;
  padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);
  border: var(--pico-border-width) solid var(--pico-border-color);
  border-radius: var(--pico-border-radius);
  outline: none;
  background-color: var(--pico-background-color);
  box-shadow: var(--pico-box-shadow);
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  font-size: 1rem;
  line-height: var(--pico-line-height);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: background-color var(--pico-transition), border-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);
  margin-bottom: var(--pico-spacing);
  box-sizing: border-box;
  white-space: unset;
  display: inline-block;
}

:host(:is(:hover, :active, :focus)) {
  --pico-background-color: var(--pico-primary-hover-background);
  --pico-border-color: var(--pico-primary-hover-border);
  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0));
  --pico-color: var(--pico-primary-inverse);
}

:host(:focus) {
  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pico-primary-focus);
}

:host([kind=secondary]) {
  --pico-background-color: var(--pico-secondary-background);
  --pico-border-color: var(--pico-secondary-border);
  --pico-color: var(--pico-secondary-inverse);
  cursor: pointer;
}

:host([kind=secondary]:is(:hover, :active, :focus)) {
  --pico-background-color: var(--pico-secondary-hover-background);
  --pico-border-color: var(--pico-secondary-hover-border);
  --pico-color: var(--pico-secondary-inverse);
}

:host([kind=secondary]:focus) {
  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pico-secondary-focus);
}

:host([kind=contrast]) {
  --pico-background-color: var(--pico-contrast-background);
  --pico-border-color: var(--pico-contrast-border);
  --pico-color: var(--pico-contrast-inverse);
}

:host([kind=contrast]:is(:hover, :active, :focus)) {
  --pico-background-color: var(--pico-contrast-hover-background);
  --pico-border-color: var(--pico-contrast-hover-border);
  --pico-color: var(--pico-contrast-inverse);
}

:host([kind=contrast]:focus) {
  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pico-contrast-focus);
}

:host([kind=outline]) {
  --pico-background-color: transparent;
  --pico-color: var(--pico-primary);
  --pico-border-color: var(--pico-primary);
}

:host([kind=outline]:is(:hover, :active, :focus)) {
  --pico-background-color: transparent;
  --pico-color: var(--pico-primary-hover);
  --pico-border-color: var(--pico-primary-hover);
}

:host(:disabled) {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}

:host([kind=secondary]:focus) {
  --pico-group-box-shadow-focus-with-button: 0 0 0 var(--pico-outline-width) var(--pico-secondary-focus);
}

:host([kind=contrast]:focus) {
  --pico-group-box-shadow-focus-with-button: 0 0 0 var(--pico-outline-width) var(--pico-contrast-focus);
}

:host([aria-busy=true]:not([kind=outline]))::before {
  filter: brightness(0) invert(1);
}

:host([hidden]) {
  display: none;
}

:host([type=submit]) {
  width: 100%;
}

:host([aria-busy=true]) {
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  :host(:not([aria-busy=true])), :host(:not([aria-busy=true]))::after, :host(:not([aria-busy=true]))::before {
    background-attachment: initial !important;
    animation-duration: 1ms !important;
    animation-delay: -1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-delay: 0s !important;
    transition-duration: 0s !important;
  }
}

input {
  display: none;
}
`)

class PiWoButton extends HTMLElement {
  #internals

  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    this.#internals = this.attachInternals()
    this.#internals.role = 'button'

    this.attachShadow({ mode: 'open' })
    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot)
    this.shadowRoot.adoptedStyleSheets = [stylesheet]

    this.addEventListener('click', event => this.#handleClick(event))
    this.addEventListener('keyup', event => this.#handleKeyUp(event))

    for (const name in PiWoButton.observedAttributes) {
      upgradeProperty(this, name)
    }
  }

  // ----- properties

  get form() {
    return this.#internals.form
  }

  #name = ''

  get name() {
    return this.#name
  }

  set name(value) {
    if (value == null) value = ''
    if (value === this.name) return
    this.#name = value
    this.setAttribute('name', value)
  }

  get disabled() {
    return this.#internals.states.has('disabled')
  }

  set disabled(flag) {
    flag = !!flag
    if (flag === this.disabled) return
    if (flag) {
      this.#internals.states.add('disabled')
      const root = this.getRootNode()
      if (root.activeElement === this) {
        this.blur()
      }
      if (this.tabIndex >= 0) {
        this.tabIndex = -1
      }
    } else {
      this.#internals.states.delete('disabled')
      if (this.tabIndex < 0) {
        this.tabIndex = 0
      }
    }
    this.#internals.ariaDisabled = String(flag)
  }

  // ----- life-cycle callbacks

  static get observedAttributes() {
    return ['disabled', 'name']
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch(name) {
      case 'disabled':
        this.disabled = newValue != null
        break
      case 'name':
        this.name = newValue
        break
    }
  }

  connectedCallback() {
    // not yet in internals - https://github.com/WICG/webcomponents/issues/762
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0
    }
  }

  // ----- event handlers

  #handleClick(event) {
    if (!this.disabled &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)) {
      // give a chance to handlers registered outside of this element
      // to prevent the default behaviour
      setTimeout(() => {
        if (event.defaultPrevented) return
        // submit and reset buttons cannot be marked yet - https://github.com/WICG/webcomponents/issues/814
        const form = this.#getForm()
        if (form) {
          const type = this.getAttribute('type')
          if (!type || type === 'submit') {
            this.#submitForm(form)
          } else if (type === 'reset') {
            form.reset()
          }
        }
      })
    }
  }

  #handleKeyUp(event) {
    if (!this.disabled &&
        (event.keyCode === 13 || event.keyCode === 32) &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)) {
      this.click()
    }
  }

  // ----- submitting the connected form

  #getForm() {
    return this.form ?? findClosestAncestorByTagName(this, 'FORM')
  }

  #submitForm(form) {
    const { name } = this
    if (name) {
      this.#internals.setFormValue(this.textContent.trim())
    }
    const submitter = document.createElement('input')
    submitter.type = 'submit'
    this.insertAdjacentElement('afterend', submitter)
    form.submitter = submitter
    form.requestSubmit(submitter)
    // let submit handlers to create FormData with the submitter's name and value
    setTimeout(() => {
      if (name) {
        this.#internals.setFormValue(null)
      }
      form.submitter = undefined
      submitter.remove()
    })
  }
}

customElements.define('piwo-button', PiWoButton)
