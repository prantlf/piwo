const InteractiveMixin = ParentElement => {
  class InteractiveElement extends ParentElement {
    connectedCallback() {
      // not yet in internals - https://github.com/WICG/webcomponents/issues/762
      if (!this.hasAttribute('tabindex')) {
        this.tabIndex = this.disabled ? -1 : 0
      }
    }
  }

  return InteractiveElement
}

export { InteractiveMixin, internals }
