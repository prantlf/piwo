export function upgradeProperty(element, name) {
  if (Object.hasOwn(element, name)) {
    const value = element[name]
    delete element[name]
    element[name] = value
  }
}

export function findClosestAncestorByTagName(element, tagName) {
	for (let parent;;) {
    parent = element.parentElement
    if (parent === null) {
      return null
    }
		if (parent.tagName === tagName) {
			return parent
		}
	}
}

export function findLabels(element) {
  const labelIds = element.getAttribute('aria-labelledby')
  if (labelIds) {
    const root = element.getRootNode()
    return labelIds
      .trim()
      .split(/ +/)
      .reduce((labels, id) => {
        const label = root.getElementById(id.trim())
        if (label) {
          labels.push(label)
        }
        return labels
      }, [])
  }
}

export function formatPlural(count, word) {
  const suffix = count === 1 ? '' : 's'
  return `${count} ${word}${suffix}`
}

export function onDisabledChange(element, value) {
  if (value) {
    const root = element.getRootNode()
    if (root.activeElement === element) {
      element.blur()
    }
    if (element.tabIndex >= 0) {
      element.tabIndex = -1
    }
  } else {
    if (element.tabIndex < 0) {
      element.tabIndex = 0
    }
  }
}

export function markValid(element) {
  if (element[messageElement]) {
    element[messageElement].textContent = element[originalMessage]
    if (!element[originalMessage]) {
      element[messageElement].style.display = 'none'
    }
    element[messageElement] = null
    element[originalMessage] = ''
  }
}

export function markInvalid(element) {
  if (ensureMessageElement(element)) {
    element[messageElement].style.display = ''
    element[messageElement].textContent = element.validationMessage
    const { form } = element
    if (element.focusError && !form?.errorFocused) {
      if (form) {
        form.errorFocused = true
      }
      element.focus()
      if (form) {
        setTimeout(() => {
          form.errorFocused = false
        })
      }
    }
  }
}

const messageElement = Symbol('messageElement')
const originalMessage = Symbol('originalMessage')

export function ensureMessageElement(element) {
  const messageIds = element.getAttribute('aria-describedby')
  if (messageIds) {
    const messageId = messageIds.trim().split(/ +/).slice(-1)[0]
    if (messageId) {
      const errorElement = document.getElementById(messageId.trim())
      if (errorElement) {
        if (errorElement !== element[messageElement]) {
          element[messageElement] = errorElement
          element[originalMessage] = errorElement.textContent
          if (!element[originalMessage]) {
            element[messageElement].style.display = 'none'
          }
        }
        return true
      }
    }
  }
}

export function setCustomError(element, anchor, message) {
  if (message) {
    element[internals].setValidity({ customError: true }, message, anchor)
  } else {
    element[internals].setValidity({})
  }
}

export function createErrorAnchor(element) {
  const errorAnchor = document.createElement('input')
  errorAnchor.tabIndex = -1
  errorAnchor.ariaHidden = 'true'
  element.shadowRoot.appendChild(errorAnchor)
  return errorAnchor
}
