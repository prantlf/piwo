import { upgradeProperty } from './helpers.js'
import commonStylesheet from './common.css'

const internals = Symbol('internals')

const ElementMixin = (ParentElement, {
  internals: enableInternals,
  attributes = {},
  interactive,
  delegatesFocus
} = {}) => {
  const observedAttributeNames = []

  class ChildElement extends ParentElement {
    constructor() {
      super()
      if (enableInternals) {
        this[internals] = this.attachInternals()
      }

      this.attachShadow({ mode: 'open', delegatesFocus })
      this.shadowRoot.adoptedStyleSheets = [commonStylesheet]

      for (const attributeName in attributes) {
        const propertyName = attributes[attributeName].property ?? attributeName
        upgradeProperty(this, propertyName)
      }
    }

    // ----- life-cycle callbacks

    static get observedAttributes() {
      return observedAttributeNames
    }

    attributeChangedCallback(name, _oldValue, newValue) {
      const { property, boolean } = attributes[name]
      this[property ?? name] = boolean ? newValue != null : newValue
    }
  
    connectedCallback() {
      // not yet in internals - https://github.com/WICG/webcomponents/issues/762
      if (interactive && !this.hasAttribute('tabindex')) {
        this.tabIndex = this.disabled ? -1 : 0
      }
    }
  }

  const { prototype } = ChildElement
  const properties = {}
  for (const attributeName in attributes) {
    const attribute = attributes[attributeName]
    let { property, type, value, internals: enableInternals, aria, state, reflect, set } = attribute
    const propertyName = property ?? attributeName
    const symbol = Symbol(propertyName)

    let boolean
    let number
    if (value === undefined) {
      if (type === 'boolean') {
          boolean = attribute.boolean = true
          value = false
      } else if (type === 'number') {
        number = attribute.number = true
        value = 0
      } else { // string
        value = ''
      }
    } else if (type === undefined) {
      if (typeof value === 'boolean') {
        boolean = true
      } else if (typeof value === 'number') {
        number = attribute.number = true
      }
    } else {
      switch (type) {
        case 'boolean':
          boolean = attribute.boolean = true
          break
        case 'number':
          number = attribute.number = true
      }
    }

    prototype[symbol] = value

    if (aria === true) {
      aria = `aria${propertyName.charAt(0).toUpperCase()}${propertyName.slice(1)}`
    }

    let setter
    if (boolean) {
      if (state) {
        if (state === true) state = propertyName
        setter = function (value) {
          value = Boolean(value)
          if (value === this[symbol]) return
          this[symbol] = value
          if (value) this[internals].states.add(state)
          else this[internals].states.delete(state)
          if (aria) this[internals][aria] = String(value)
          if (reflect) this.toggleAttribute(attributeName, value)
          if (set) set.call(this, value)
        }
      } else {
        setter = function (value) {
          value = Boolean(value)
          if (value === this[symbol]) return
          this[symbol] = value
          if (enableInternals) this[internals][propertyName] = value
          if (aria) this[internals][aria] = String(value)
          if (reflect) this.toggleAttribute(attributeName, value)
          if (set) set.call(this, value)
        }
      }
    } else if (number) {
      setter = function (value) {
        if (value == null) {
          value = 0
        } else { 
          value = Number(value)
          if (Number.isNaN(value)) value = 0
        }
        if (value === this[symbol]) return
        this[symbol] = value
        if (enableInternals) this[internals][propertyName] = value
        if (aria) this[internals][aria] = String(value)
        if (reflect) this.setAttribute(attributeName, String(value))
        if (set) set.call(this, value)
      }
    } else {
      setter = function (value) {
        if (value == null) value = ''
        else value = String(value)
        if (value === this[symbol]) return
        this[symbol] = value
        if (enableInternals) this[internals][propertyName] = value
        if (aria) this[internals][aria] = value
        if (reflect) this.setAttribute(attributeName, value)
        if (set) set.call(this, value)
      }
    }

    properties[propertyName] = {
      configurable: true,
      enumerable: true,
      get() {
        return this[symbol]
      },
      set: setter
    }

    observedAttributeNames.push(attributeName)
  }

  Object.defineProperties(prototype, properties)

  return ChildElement
}

export { ElementMixin, internals }
