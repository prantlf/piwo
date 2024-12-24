import commonStylesheet from './common.css'

const ShadowMixin = (ParentElement, {
  delegatesFocus
} = {}) => {
  class ShadowElement extends ParentElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open', delegatesFocus })
      this.shadowRoot.adoptedStyleSheets = [commonStylesheet]
    }
  }

  return ShadowElement
}

export { ShadowMixin }
