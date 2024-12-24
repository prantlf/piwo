const internals = Symbol('internals')

const InternalsMixin = ParentElement => {
  class InternalsElement extends ParentElement {
    constructor() {
      super()
      this[internals] = this.attachInternals()
    }
  }

  return InternalsElement
}

export { InternalsMixin, internals }
