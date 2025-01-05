function convertValue(value, schema) {
  const { type } = schema
  if (Array.isArray(value) && value.length === 1) value = value[0]
  switch (type) {
    case 'boolean':
      value = value === 'on'
      break
    case 'integer':
    case 'number':
      value = +value
  }
  return value
}

function getObjectValues(schema, formData) {
  const values = {}
  const { properties } = schema
  for (const fieldName in properties) {
    const fieldSchema = properties[fieldName]
    const { type } = fieldSchema
    let value
    if (!type || type === 'object') {
      value = getObjectValues(fieldSchema, formData)
    } else {
      value = formData.get(fieldName)
      value = convertValue(value, fieldSchema)
    }
    values[fieldName] = value
  }
  return values
}

export function getFormValues(form, schema) {
  const formData = new FormData(form)
  const values = getObjectValues(schema, formData)
  return values
}
