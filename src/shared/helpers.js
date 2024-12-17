export function createStylesheet(styles) {
  const stylesheet = new CSSStyleSheet()
  stylesheet.replace(styles)
  return stylesheet
}

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
      .split[/ +/]
      .reduce((labels, id) => {
        const label = root.getElementById(id.trim())
        if (label) {
          labels.push(label)
        }
        return labels
      }, [])
  }
}