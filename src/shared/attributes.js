import { upgradeProperty } from './helpers.js'
import { internals } from './internals.js'

const AttributesMixin = (ParentElement, {
  attributes = {}
} = {}) => {
  const observedAttributeNames = []

  class AttributesElement extends ParentElement {
    constructor() {
      super()

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
      const propertyName = property ?? name
      if (boolean) newValue = newValue != null
      console.debug(`attributeChanged: "${name}" -> "${propertyName}", ${_oldValue} -> "${newValue}"`)
      this[propertyName] = newValue
    }
  }

  const { prototype } = AttributesElement
  const properties = {}
  for (let attributeName in attributes) {
    const options = attributes[attributeName]
    let { property, attribute, type, value, internals: enableInternals, aria, state, reflect, set } = options
    const propertyName = property ?? attributeName
    const symbol = Symbol(propertyName)
    if (attribute) {
      attributeName = attribute
      options.property = propertyName
      attributes[attributeName] = options
    }

    let boolean
    let number
    if (value === undefined) {
      if (type === 'boolean') {
          boolean = options.boolean = true
          value = false
      } else if (type === 'number') {
        number = options.number = true
        value = 0
      } else { // string
        value = ''
      }
    } else if (type === undefined) {
      if (typeof value === 'boolean') {
        boolean = true
      } else if (typeof value === 'number') {
        number = options.number = true
      }
    } else {
      switch (type) {
        case 'boolean':
          boolean = options.boolean = true
          break
        case 'number':
          number = options.number = true
      }
    }

    prototype[symbol] = value

    if (aria === true) {
      aria = `aria${propertyName.charAt(0).toUpperCase()}${propertyName.slice(1)}`
    }

    let setter
    if (boolean) {
      if (state === true) state = propertyName
      setter = function (value) {
        value = Boolean(value)
        if (value === this[symbol]) return
        this[symbol] = value
        if (state) {
          if (value) this[internals].states.add(state)
          else this[internals].states.delete(state)
        }
        if (enableInternals) this[internals][propertyName] = value
        if (aria) this[internals][aria] = String(value)
        if (reflect) this.toggleAttribute(attributeName, value)
        if (set) set.call(this, value)
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

    if (reflect) {
      observedAttributeNames.push(attributeName)
    }
  }

  Object.defineProperties(prototype, properties)

  return AttributesElement
}

export { AttributesMixin }
