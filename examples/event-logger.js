export default function registerSelector(selector) {
  const checkboxes = document.querySelectorAll(selector)
  for (const button of checkboxes) {
    logEvents(button)
  }
}

function logEvents(checkbox) {
  for (const eventName of ['beforeinput', 'input', 'change', 'click', 'focus', 'focusin', 'focusout', 'blur']) {
    logEvent(checkbox, eventName)
  }
}

function logEvent(checkbox, eventName) {
  checkbox.addEventListener(eventName, ({ target }) => {
    const labelSource = target.labels ? target.labels[0] : target
    console.log(`${eventName}:`, labelSource?.innerText.trim())
  })
}
