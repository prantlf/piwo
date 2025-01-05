let idCounter = 0

function getTitle(fieldSchema, fieldOptions) {
  return fieldOptions.label || fieldSchema.title
}

function getValue(fieldData, fieldSchema) {
  return fieldData ?? fieldSchema.default
}

function createLabel() {
  const label = document.createElement('piwo-label')
  return label
}

function appendMessage(form, field, fieldSchema, fieldOptions) {
  const msg = document.createElement('piwo-small')
  const id = `msg${idCounter++}`
  msg.id = id
  field.setAttribute('aria-describedby', id)
  if (fieldOptions.helper) {
    const text = document.createTextNode(fieldOptions.helper || fieldSchema.description)
    msg.appendChild(text)
  }
  form.appendChild(msg)
}

function appendSeparateLabel(form, tagName, fieldSchema, fieldOptions) {
  const label = createLabel()
  const id = `${tagName}${idCounter++}`
  label.htmlFor = id
  let title = getTitle(fieldSchema, fieldOptions)
  if (!title.endsWith(':')) title += ':'
  const text = document.createTextNode(title)
  label.appendChild(text)
  form.appendChild(label)
  return id
}

function createField(tagName, fieldName, fieldSchema, fieldOptions, parentSchema) {
  const field = document.createElement(`piwo-${tagName}`)
  field.name = fieldName
  applyCommonConstraints(field, fieldSchema, fieldOptions, parentSchema)
  return field
}

function applyCommonConstraints(field, fieldSchema, fieldOptions, parentSchema) {
  if (fieldSchema.required || parentSchema.required?.includes(field.name)) field.required = true
  if (fieldSchema.readonly || fieldSchema.readOnly) field.readonly = true
  if (fieldOptions.disabled) field.disabled = true
  field.describeError = true
  field.focusError = true
}

function applyRangeConstraints(field, fieldSchema, fieldOptions) {
  if (fieldSchema.maximum != null) field.max = fieldSchema.maximum
  if (fieldSchema.minimum != null) field.min = fieldSchema.minimum
  if (fieldOptions.step != null) field.step = fieldSchema.step
}

function applySizeConstraints(field, fieldSchema) {
  if (fieldSchema.maxLength != null) field.maxLength = fieldSchema.maxLength
  if (fieldSchema.minLength != null) field.minLength = fieldSchema.minLength
}

function applyTextConstraints(field, fieldOptions) {
  if (fieldOptions.autocomplete) field.autocomplete = true
  if (fieldOptions.placeholder) field.placeholder = fieldOptions.placeholder
}

function appendDataList(input, fieldSchema, fieldOptions) {
  let { enum: values } = fieldSchema
  const { optionLabels } = fieldOptions
  if (values || optionLabels) {
    const dataList = document.createElement('datalist')
    dataList.slot = 'data'
    if (!values) {
      const { minimum, maximum } = fieldSchema
      const { step } = fieldOptions
      values = new Array(optionLabels.length)
      for (let i = 0, value = minimum; value <= maximum; value += step) {
        values[i++] = value
      }
    }
    for (let i = 0, l = values.length; i < l; ++i) {
      const option = document.createElement('option')
      const value = values[i]
      option.value = String(value)
      const title = String(optionLabels?.[i] ?? value)
      const text = document.createTextNode(title)
      option.appendChild(text)
      dataList.appendChild(option)
    }
    input.ticks = true
    input.appendChild(dataList)
  }
}

function appendBooleanField(type, form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const label = createLabel()
  const checkbox = createField(type, fieldName, fieldSchema, fieldOptions, parentSchema)
  const checked = getValue(fieldData, fieldSchema)
  if (checked) checkbox.defaultChecked = true
  label.appendChild(checkbox)
  const title = getTitle(fieldSchema, fieldOptions)
  const text = document.createTextNode(`\n${title}`)
  label.appendChild(text)
  form.appendChild(label)
  appendMessage(form, checkbox, fieldSchema, fieldOptions)
}

function appendInputField(type, form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const id = appendSeparateLabel(form, 'input', fieldSchema, fieldOptions)
  const input = createField('input', fieldName, fieldSchema, fieldOptions, parentSchema)
  input.id = id
  input.type = type
  const value = getValue(fieldData, fieldSchema)
  if (value) input.defaultValue = value
  applySizeConstraints(input, fieldSchema)
  if (fieldSchema.pattern != null) input.pattern = fieldSchema.pattern
  form.appendChild(input)
  appendMessage(form, input, fieldSchema, fieldOptions)
  return input
}

function appendCheckboxField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  appendBooleanField('checkbox', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
}

function appendColorField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  appendInputField('color', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
}

function appendDateField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = appendInputField('date', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
  applyRangeConstraints(input, fieldSchema, fieldOptions)
  appendDataList(input, fieldSchema, fieldOptions)
}

function appendDateTimeField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = appendInputField('datetime-local', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
  applyRangeConstraints(input, fieldSchema, fieldOptions)
  appendDataList(input, fieldSchema, fieldOptions)
}

function appendEmailField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = appendInputField('email', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
  applyTextConstraints(input, fieldOptions)
  appendDataList(input, fieldSchema, fieldOptions)
}

function appendFileField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  appendInputField('file', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
}

function appendHiddenField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = fieldName
  const value = getValue(fieldData, fieldSchema)
  if (value) input.defaultValue = value
  form.appendChild(input)
}

function appendNumberField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = appendInputField('number', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
  applyTextConstraints(input, fieldOptions)
  applyRangeConstraints(input, fieldSchema, fieldOptions)
  appendDataList(input, fieldSchema, fieldOptions)
}

function appendObjectField(form, _fieldName, fieldData, fieldSchema, fieldOptions, _parentSchema) {
  const fieldSet = document.createElement('piwo-fieldset')
  if (fieldOptions.disabled) fieldSet.disabled = true
  const legend = document.createElement('piwo-legend')
  const title = getTitle(fieldSchema, fieldOptions)
  const text = document.createTextNode(title)
  legend.appendChild(text)
  fieldSet.appendChild(legend)
  const { properties } = fieldSchema
  const { fields } = fieldOptions
  for (const childName in properties) {
    const childData = fieldData?.[childName] ?? null
    const childSchema = properties[childName]
    const childOptions = fields?.[childName] ?? {}
    const childType = (childOptions.hidden ? 'hidden' : childOptions.type) ?? (childSchema.format ?? childSchema.type) ?? 'object'
    const appendField = fieldFactories[childType]
    if (!appendField) throw new Error(`Unknown field type: "${childType}"`)
    appendField(fieldSet, childName, childData, childSchema, childOptions, fieldSchema)
  }
  form.appendChild(fieldSet)
}

function appendPasswordField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = appendInputField('password', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
  applyTextConstraints(input, fieldOptions)
}

function appendPhoneField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = appendInputField('tel', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
  applyTextConstraints(input, fieldOptions)
  appendDataList(input, fieldSchema, fieldOptions)
}

function appendRadioField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const fieldSet = document.createElement('piwo-fieldset')
  fieldSet.role = 'radiogroup'
  if (fieldOptions.disabled) fieldSet.disabled = true
  const legend = document.createElement('piwo-legend')
  let title = getTitle(fieldSchema, fieldOptions)
  if (!title.endsWith(':')) title += ':'
  const text = document.createTextNode(title)
  legend.appendChild(text)
  fieldSet.appendChild(legend)
  const checkedValue = getValue(fieldData, fieldSchema)
  const { enum: values } = fieldSchema
  const { optionLabels } = fieldOptions
  for (let i = 0, l = values.length; i < l; ++i) {
    const label = createLabel()
    const radio = document.createElement('piwo-radio')
    radio.name = fieldName
    const value = values[i]
    radio.value = value
    if (checkedValue === value) radio.defaultChecked = true
    if (fieldSchema.readonly || fieldSchema.readOnly) radio.readonly = true
    if (fieldOptions.disabled) radio.disabled = true
    label.appendChild(radio)
    const title = optionLabels?.[i] ?? value
    const text = document.createTextNode(`\n${title}`)
    label.appendChild(text)
    fieldSet.appendChild(label)
  }
  form.appendChild(fieldSet)
  appendMessage(fieldSet, fieldSet, fieldSchema, fieldOptions)
}

function appendRangeField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = appendInputField('range', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
  applyRangeConstraints(input, fieldSchema, fieldOptions)
  appendDataList(input, fieldSchema, fieldOptions)
}

function appendSelectField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const id = appendSeparateLabel(form, 'select', fieldSchema, fieldOptions)
  const select = createField('select', fieldName, fieldSchema, fieldOptions, parentSchema)
  select.id = id
  const selectedValue = getValue(fieldData, fieldSchema)
  const { enum: values } = fieldSchema
  const { placeholder, optionLabels } = fieldOptions
  if (placeholder) {
    const option = document.createElement('option')
    option.value = ''
    option.disabled = true
    if (!selectedValue) option.defaultSelected = true
    option.hidden = true
    const text = document.createTextNode(placeholder)
    option.appendChild(text)
    select.appendChild(option)
  }
  for (let i = 0, l = values.length; i < l; ++i) {
    const option = document.createElement('option')
    const value = values[i];
    option.value = value
    if (selectedValue === value) option.defaultSelected = true
    const title = optionLabels?.[i] ?? value
    const text = document.createTextNode(title)
    option.appendChild(text)
    select.appendChild(option)
  }
  form.appendChild(select)
  appendMessage(form, select, fieldSchema, fieldOptions)
}

function appendSearchField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = appendInputField('search', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
  applyTextConstraints(input, fieldOptions)
  appendDataList(input, fieldSchema, fieldOptions)
}

function appendSwitchField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  appendBooleanField('switch', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
}

function appendTextAreaField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const id = appendSeparateLabel(form, 'textarea', fieldSchema, fieldOptions)
  const textArea = createField('textarea', fieldName, fieldSchema, fieldOptions, parentSchema)
  textArea.id = id
  const value = getValue(fieldData, fieldSchema)
  if (value) textArea.textContent = value
  applySizeConstraints(textArea, fieldSchema)
  applyTextConstraints(textArea, fieldOptions)
  form.appendChild(textArea)
  appendMessage(form, textArea, fieldSchema, fieldOptions)
}

function appendTextField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = appendInputField('text', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
  applyTextConstraints(input, fieldOptions)
  appendDataList(input, fieldSchema, fieldOptions)
}

function appendTimeField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = appendInputField('time', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
  applyRangeConstraints(input, fieldSchema, fieldOptions)
  appendDataList(input, fieldSchema, fieldOptions)
}

function appendUrlField(form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema) {
  const input = appendInputField('url', form, fieldName, fieldData, fieldSchema, fieldOptions, parentSchema)
  applyTextConstraints(input, fieldOptions)
  appendDataList(input, fieldSchema, fieldOptions)
}

function appendButton(form, id, definition) {
  const { title, type } = definition
  const button = document.createElement('piwo-button')
  button.id = id
  if (type) {
    button.type = type
    if (type !== 'submit') button.outline = true
  }
  const text = document.createTextNode(title)
  button.appendChild(text)
  form.appendChild(button)
}

function appendSpacer(form, factor) {
  const spacer = document.createElement('piwo-spacer')
  if (factor) spacer.factor = factor
  form.appendChild(spacer)
}

const fieldFactories = {
  boolean: appendCheckboxField,
  checkbox: appendCheckboxField,
  color: appendColorField,
  date: appendDateField,
  'date-time': appendDateTimeField,
  datetime: appendDateTimeField,
  email: appendEmailField,
  file: appendFileField,
  hidden: appendHiddenField,
  integer: appendNumberField,
  number: appendNumberField,
  object: appendObjectField,
  password: appendPasswordField,
  phone: appendPhoneField,
  radio: appendRadioField,
  range: appendRangeField,
  search: appendSearchField,
  select: appendSelectField,
  string: appendTextField,
  switch: appendSwitchField,
  text: appendTextField,
  textarea: appendTextAreaField,
  time: appendTimeField,
  uri: appendUrlField,
  url: appendUrlField
}

export function appendFormContent(form, definition) {
  const { data, schema, options = {}, form: others = {} } = definition
  const { properties } = schema
  const { fields } = options
  let lastFieldType
  for (const fieldName in properties) {
    const fieldData = data?.[fieldName] ?? null
    const fieldSchema = properties[fieldName]
    const fieldOptions = fields?.[fieldName] ?? {}
    lastFieldType = fieldSchema.type
    const fieldType = (fieldOptions.hidden ? 'hidden' : fieldOptions.type) ?? (fieldSchema.format ?? lastFieldType) ?? 'object'
    const appendField = fieldFactories[fieldType]
    if (!appendField) throw new Error(`Unknown field type: "${fieldType}"`)
    appendField(form, fieldName, fieldData, fieldSchema, fieldOptions, schema)
  }
  const { buttons = {} } = others
  if (Object.keys(buttons).length) {
    const factor = lastFieldType !== 'boolean' ? undefined : 2
    appendSpacer(form, factor)
  }
  for (const id in buttons) {
    const button = buttons[id]
    appendButton(form, id, button)
  }
}
