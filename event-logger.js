import { getFormValues  } from '../dist/index.mjs'

export function registerForm(id, schema) {
  const form = document.getElementById(id)
  form.addEventListener('submit', event => {
    event.preventDefault()
    const { button } = form.submitter
    button.ariaBusy = 'true'
    const formData = new FormData(form)
    const data = {}
    for (const [name, values] of formData.entries()) {
      data[name] = Array.isArray(values) && values.length === 1 ? values[0] : values
    }
    console.log(`Form data of "${id}":`, data)
    if (schema) {
      const values = getFormValues(form, schema)
      console.log(`Form field values of "${id}":`, values)
    }
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
