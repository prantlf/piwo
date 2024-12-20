export function registerForm(id) {
  const form = document.getElementById(id)
  form.addEventListener('submit', event => {
    event.preventDefault()
    const { button } = form.submitter
    button.ariaBusy = 'true'
    console.log(id, new FormData(form))
    setTimeout(() => {
      button.ariaBusy = null
    }, 1000)
  })
}

export function registerField(selector) {
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
