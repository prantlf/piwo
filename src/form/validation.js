export function registerCustomValidation(form, fieldName, validationCallback) {
  const field = form.elements[fieldName]
  field.addEventListener('input', () => {
    const message = validationCallback(field)
    field.setCustomValidity(message || '')
  })
}
