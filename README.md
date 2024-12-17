# Pico Web Components

Experimental web components. A demonstration of the technology rather than a library for building applications. But that may change :-)

* Low-level. Granularity of native elements for fully flexible layouts and combinations with the native elements.
* Tiny. Avoid dependencies on heavy frameworks when writing small web components.
* Integrated. Usable interchangeably with the native HTML elements by providing the same interface.
* Accessible. Support assistive technologies like screen readers by the form-associated interface.
* Styled. When used alone, they don't need additional styles to compose a good layout.
* Protected. Shadow DOM makes the inner styles resistant against external stylesheets.

Styles aren't cleaned up yet. It's just a copy of a part of [Pico CSS]. Refactoring to improve and share code among the components will be done after more concepts are evaluated.

## Motivation

* Prototype lightweight low-level web components, which can be used interchangeably with the native HTML elements.
* Check feasibility of such implementation with the current state of the web component support.
* Avoid unnecessary complexity of wrapping native elements with the same role in the shadow DOM and then synchronising their states, when it's possible to implement the form-associated interface on the host element.

## Example

Picture:

![Login Form](./docs/login.png)

Markup:

```jsx live
<>
  <header>
    <piwo-h level="1">Login</piwo-h>
    <piwo-p>Provide your credentials to authenticate to the web application.</piwo-p>
  </header>

  <main>
    <form id="login">
      <piwo-label for="name">Name:</piwo-label>
      <piwo-input name="name" type="text" placeholder="Enter your login name"
                  id="name" aria-describedby="name-msg" required describeerror focuserror></piwo-input>
      <piwo-msg id="name-msg">Ask the admin about your user name.</piwo-msg>
      <piwo-label>
        Password:
        <piwo-input name="password" type="password" placeholder="Enter your password"></piwo-input>
      </piwo-label>

      <piwo-label>
        <piwo-checkbox name="remember-me"></piwo-checkbox>
        Rememeber me
      </piwo-label>
      <piwo-label>
        <piwo-checkbox name="i-agree" required></piwo-checkbox>
        I agree with collecting my name and password
      </piwo-label>

      <piwo-spacer factor="1.5"></piwo-spacer>

      <piwo-button>Submit</piwo-button>
      <piwo-button type="reset" kind="outline">Reset</piwo-button>
    </form>
  </main>
</>
```

## Components

### Label

Label for form fields.

* Lightweight - only a slot for inner content. The host element has no role.
* Can be used just like the native label - by wrapping the field in its body, by pointing to a field by the `for` attribute, or by having the field point to it by the `aria-labelledby` attribute.
* Attributes and element content can be modified any time later.
* Clicks are forwarded to the target field.

```jsx live
<>
  <piwo-label for="first-name">First Name:</piwo-label>
  <piwo-input name="first-name" id="first-name" type="text"></piwo-input>
</>
```

### Checkbox

Checkbox form field.

* Lightweight - only an SVG image in the inner content. The host element itself has the role `checkbox`.
* Form-associated element. Can be used like `input[type=checkbox]`.
* Implements many attributes of the native element.
* Supports events `click`, `beforeinput`, `input` and `change` including `preventDefault`.
* Fills the value `on` or nothing to `FormData`.
* Remembers the current state for back and forth navigation in the browser.
* Can reset the value on form `reset`.
* Exposes states `checked`, `indeterminate`, `disabled`, `readonly` and `required` in CSS.
* Validates input including custom errors.
* Emphasises valid or invalid state if `aria-invalid` is set explicitly.
* Allows either showing the browser popup, or a HTML message for invalid fields, if `describeerror` is set and the last ID in `aria-describedby` points to an element with content. If the element is hidden, it'll be temporarily shown.

```jsx live
<>
  <div>
    <piwo-checkbox id="unchecked"></piwo-checkbox>
    <piwo-label for="unchecked">Unchecked</piwo-label>

    <piwo-checkbox id="checked" checked></piwo-checkbox>
    <piwo-label for="checked">Checked</piwo-label>

    <piwo-checkbox id="invalid" required aria-invalid="true"></piwo-checkbox>
    <piwo-label for="invalid">Invalid</piwo-label>

    <piwo-checkbox id="valid" checked aria-invalid="false"></piwo-checkbox>
    <piwo-label for="valid">Valid</piwo-label>
  </div>

  <piwo-label>
    <piwo-checkbox indeterminate></piwo-checkbox>
    Indeterminate
  </piwo-label>
</>
```

### Input

Input form field.

* Uses a native `input` element for the editing functionality. Hides it from accessible technologies. (This may yet change.) The host element itself has the role `textbox`.
* Form-associated element. Can be used like `input[type=text]` and other types using a textbox for editing.
* Implements many attributes of the native element.
* Supports events `click`, `beforeinput`, `input` and `change` including `preventDefault`.
* Fills the value to `FormData`.
* Remembers the current value for back and forth navigation in the browser.
* Can reset the value on form `reset`.
* Exposes states `disabled`, `readonly` and `required` in CSS.
* Validates input including custom errors.
* Emphasises valid or invalid state if `aria-invalid` is set explicitly.
* Allows either showing the browser popup, or a HTML message for invalid fields, if `describeerror` is set and the last ID in `aria-describedby` points to an element with content. If the element is hidden, it'll be temporarily shown.

```jsx live
<>
  <piwo-input name="last-name" type="text" aria-label="Last name" placeholder="Enter your last name"></piwo-input>
  <piwo-input name="missing-last-name" type="text" aria-label="Last name" placeholder="Enter your last name" aria-invalid="true" required></piwo-input>
  <piwo-input name="entered-last-name" type="text" aria-label="Last name" placeholder="Enter your last name" aria-invalid="false" required value="Doe"></piwo-input>
</>
```

### Message

Information or error message for form fields.

* Lightweight - only a slot for inner content. The host element has no role.
* Multi-purpose. Information message can be temporarily replaced by the error message.
* Can be used just like the native elements - by having the field point to it by the `aria-describedby` attribute.

```jsx live
<>
  <piwo-input name="user-name" type="text" placeholder="Enter your user name" aria-label="User name" aria-describedby="user-name-msg"></piwo-input>
  <piwo-msg id="user-name-msg">Ask the admin about your user name.</piwo-msg>

  <piwo-input name="login-name" type="text" placeholder="Enter your login name" aria-label="Login name" aria-describedby="login-name-msg" aria-invalid="true" required describeerror></piwo-input>
  <piwo-msg id="login-name-msg">Ask the admin about your login name.</piwo-msg>
</>
```

### Heading

Heading element of the level 1 - 6 aligned with `h1` - `h6`.

* Lightweight - only a slot for inner content. The host element has the `heading` role with the corresponding level.

```jsx live
<piwo-h level="1">Login</piwo-h>
```

### Paragraph

Paragraph element.

* Lightweight - only a slot for inner content. The host element has the `paragraph` role.

```jsx live
<piwo-p>Provide your credentials to authenticate to the web application.</piwo-p>
```

### Spacer

Inserts empty vertical space.

* Lightweight - no content. The host element has no role.

```jsx live
<piwo-spacer factor="1.5"></piwo-spacer>
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code.

## License

Copyright (C) 2022-2024 Ferdinand Prantl

Licensed under the [MIT License].

[MIT License]: http://en.wikipedia.org/wiki/MIT_License
[Pico CSS]: https://picocss.com/
