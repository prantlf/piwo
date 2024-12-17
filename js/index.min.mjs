function e(e){let o=new CSSStyleSheet;return o.replace(e),o}function o(e,o){if(Object.hasOwn(e,o)){let i=e[o];delete e[o],e[o]=i}}function i(e){let o=e.getAttribute("aria-labelledby");if(o){let i=e.getRootNode();return o.trim().split[/ +/].reduce((e,o)=>{let r=i.getElementById(o.trim());return r&&e.push(r),e},[])}}const r=e(`
:root {
  --pico-font-family-emoji: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --pico-font-family-sans-serif: system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, Helvetica, Arial, "Helvetica Neue", sans-serif, var(--pico-font-family-emoji);
  --pico-font-family-monospace: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace, var(--pico-font-family-emoji);
  --pico-font-family: var(--pico-font-family-sans-serif);
  --pico-line-height: 1.5;
  --pico-font-weight: 400;
  --pico-font-size: 100%;
  --pico-text-underline-offset: 0.1rem;
  --pico-border-radius: 0.25rem;
  --pico-border-width: 0.0625rem;
  --pico-outline-width: 0.125rem;
  --pico-transition: 0.2s ease-in-out;
  --pico-spacing: 1rem;
  --pico-typography-spacing-vertical: 1rem;
  --pico-block-spacing-vertical: var(--pico-spacing);
  --pico-block-spacing-horizontal: var(--pico-spacing);
  --pico-grid-column-gap: var(--pico-spacing);
  --pico-grid-row-gap: var(--pico-spacing);
  --pico-form-element-spacing-vertical: 0.75rem;
  --pico-form-element-spacing-horizontal: 1rem;
  --pico-group-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  --pico-group-box-shadow-focus-with-button: 0 0 0 var(--pico-outline-width) var(--pico-primary-focus);
  --pico-group-box-shadow-focus-with-input: 0 0 0 0.0625rem var(--pico-form-element-border-color);
  --pico-modal-overlay-backdrop-filter: blur(0.375rem);
  --pico-nav-element-spacing-vertical: 1rem;
  --pico-nav-element-spacing-horizontal: 0.5rem;
  --pico-nav-link-spacing-vertical: 0.5rem;
  --pico-nav-link-spacing-horizontal: 0.5rem;
  --pico-nav-breadcrumb-divider: ">";
  --pico-icon-checkbox: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(255, 255, 255)' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  --pico-icon-minus: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(255, 255, 255)' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3C/svg%3E");
}

@media (min-width: 576px) {
  :root {
    --pico-font-size: 106.25%;
  }
}
@media (min-width: 768px) {
  :root {
    --pico-font-size: 112.5%;
  }
}
@media (min-width: 1024px) {
  :root {
    --pico-font-size: 118.75%;
  }
}
@media (min-width: 1280px) {
  :root {
    --pico-font-size: 125%;
  }
}
@media (min-width: 1536px) {
  :root {
    --pico-font-size: 131.25%;
  }
}

[data-theme=light], :root:not([data-theme=dark]) {
  --pico-background-color: #fff;
  --pico-color: #373c44;
  --pico-text-selection-color: rgba(2, 154, 232, 0.25);
  --pico-muted-color: #646b79;
  --pico-muted-border-color: #e7eaf0;
  --pico-primary: #0172ad;
  --pico-primary-background: #0172ad;
  --pico-primary-border: var(--pico-primary-background);
  --pico-primary-underline: rgba(1, 114, 173, 0.5);
  --pico-primary-hover: #015887;
  --pico-primary-hover-background: #02659a;
  --pico-primary-hover-border: var(--pico-primary-hover-background);
  --pico-primary-hover-underline: var(--pico-primary-hover);
  --pico-primary-focus: rgba(2, 154, 232, 0.5);
  --pico-primary-inverse: #fff;
  --pico-secondary: #5d6b89;
  --pico-secondary-background: #525f7a;
  --pico-secondary-border: var(--pico-secondary-background);
  --pico-secondary-underline: rgba(93, 107, 137, 0.5);
  --pico-secondary-hover: #48536b;
  --pico-secondary-hover-background: #48536b;
  --pico-secondary-hover-border: var(--pico-secondary-hover-background);
  --pico-secondary-hover-underline: var(--pico-secondary-hover);
  --pico-secondary-focus: rgba(93, 107, 137, 0.25);
  --pico-secondary-inverse: #fff;
  --pico-contrast: #181c25;
  --pico-contrast-background: #181c25;
  --pico-contrast-border: var(--pico-contrast-background);
  --pico-contrast-underline: rgba(24, 28, 37, 0.5);
  --pico-contrast-hover: #000;
  --pico-contrast-hover-background: #000;
  --pico-contrast-hover-border: var(--pico-contrast-hover-background);
  --pico-contrast-hover-underline: var(--pico-secondary-hover);
  --pico-contrast-focus: rgba(93, 107, 137, 0.25);
  --pico-contrast-inverse: #fff;
  --pico-box-shadow: 0.0145rem 0.029rem 0.174rem rgba(129, 145, 181, 0.01698), 0.0335rem 0.067rem 0.402rem rgba(129, 145, 181, 0.024), 0.0625rem 0.125rem 0.75rem rgba(129, 145, 181, 0.03), 0.1125rem 0.225rem 1.35rem rgba(129, 145, 181, 0.036), 0.2085rem 0.417rem 2.502rem rgba(129, 145, 181, 0.04302), 0.5rem 1rem 6rem rgba(129, 145, 181, 0.06), 0 0 0 0.0625rem rgba(129, 145, 181, 0.015);
  --pico-h1-color: #2d3138;
  --pico-h2-color: #373c44;
  --pico-h3-color: #424751;
  --pico-h4-color: #4d535e;
  --pico-h5-color: #5c6370;
  --pico-h6-color: #646b79;
  --pico-mark-background-color: #fde7c0;
  --pico-mark-color: #0f1114;
  --pico-ins-color: #1d6a54;
  --pico-del-color: #883935;
  --pico-button-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  --pico-button-hover-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  --pico-form-element-background-color: #fbfcfc;
  --pico-form-element-selected-background-color: #dfe3eb;
  --pico-form-element-border-color: #cfd5e2;
  --pico-form-element-readonly-border-color: rgb(207, 213, 226, var(--pico-form-element-disabled-opacity));
  --pico-form-element-color: #23262c;
  --pico-form-element-placeholder-color: var(--pico-muted-color);
  --pico-form-element-active-background-color: #fff;
  --pico-form-element-active-border-color: var(--pico-primary-border);
  --pico-form-element-focus-color: var(--pico-primary-border);
  --pico-form-element-disabled-opacity: 0.5;
  --pico-form-element-invalid-border-color: #b86a6b;
  --pico-form-element-invalid-active-border-color: #c84f48;
  --pico-form-element-invalid-focus-color: var(--pico-form-element-invalid-active-border-color);
  --pico-form-element-valid-border-color: #4c9b8a;
  --pico-form-element-valid-active-border-color: #279977;
  --pico-form-element-valid-focus-color: var(--pico-form-element-valid-active-border-color);
  --pico-switch-background-color: #bfc7d9;
  --pico-switch-checked-background-color: var(--pico-primary-background);
  --pico-switch-color: #fff;
  --pico-switch-thumb-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  --pico-range-border-color: #dfe3eb;
  --pico-range-active-border-color: #bfc7d9;
  --pico-range-thumb-border-color: var(--pico-background-color);
  --pico-range-thumb-color: var(--pico-secondary-background);
  --pico-range-thumb-active-color: var(--pico-primary-background);
  --pico-progress-background-color: #dfe3eb;
  --pico-progress-color: var(--pico-primary-background);
  --pico-tooltip-background-color: var(--pico-contrast-background);
  --pico-tooltip-color: var(--pico-contrast-inverse);
  --pico-icon-valid: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(76, 155, 138)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  --pico-icon-invalid: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(200, 79, 72)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E");
  color-scheme: light;
}

@media only screen and (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --pico-background-color: #13171f;
    --pico-color: #c2c7d0;
    --pico-text-selection-color: rgba(1, 170, 255, 0.1875);
    --pico-muted-color: #7b8495;
    --pico-muted-border-color: #202632;
    --pico-primary: #01aaff;
    --pico-primary-background: #0172ad;
    --pico-primary-border: var(--pico-primary-background);
    --pico-primary-underline: rgba(1, 170, 255, 0.5);
    --pico-primary-hover: #79c0ff;
    --pico-primary-hover-background: #017fc0;
    --pico-primary-hover-border: var(--pico-primary-hover-background);
    --pico-primary-hover-underline: var(--pico-primary-hover);
    --pico-primary-focus: rgba(1, 170, 255, 0.375);
    --pico-primary-inverse: #fff;
    --pico-secondary: #969eaf;
    --pico-secondary-background: #525f7a;
    --pico-secondary-border: var(--pico-secondary-background);
    --pico-secondary-underline: rgba(150, 158, 175, 0.5);
    --pico-secondary-hover: #b3b9c5;
    --pico-secondary-hover-background: #5d6b89;
    --pico-secondary-hover-border: var(--pico-secondary-hover-background);
    --pico-secondary-hover-underline: var(--pico-secondary-hover);
    --pico-secondary-focus: rgba(144, 158, 190, 0.25);
    --pico-secondary-inverse: #fff;
    --pico-contrast: #dfe3eb;
    --pico-contrast-background: #eff1f4;
    --pico-contrast-border: var(--pico-contrast-background);
    --pico-contrast-underline: rgba(223, 227, 235, 0.5);
    --pico-contrast-hover: #fff;
    --pico-contrast-hover-background: #fff;
    --pico-contrast-hover-border: var(--pico-contrast-hover-background);
    --pico-contrast-hover-underline: var(--pico-contrast-hover);
    --pico-contrast-focus: rgba(207, 213, 226, 0.25);
    --pico-contrast-inverse: #000;
    --pico-box-shadow: 0.0145rem 0.029rem 0.174rem rgba(7, 9, 12, 0.01698), 0.0335rem 0.067rem 0.402rem rgba(7, 9, 12, 0.024), 0.0625rem 0.125rem 0.75rem rgba(7, 9, 12, 0.03), 0.1125rem 0.225rem 1.35rem rgba(7, 9, 12, 0.036), 0.2085rem 0.417rem 2.502rem rgba(7, 9, 12, 0.04302), 0.5rem 1rem 6rem rgba(7, 9, 12, 0.06), 0 0 0 0.0625rem rgba(7, 9, 12, 0.015);
    --pico-h1-color: #f0f1f3;
    --pico-h2-color: #e0e3e7;
    --pico-h3-color: #c2c7d0;
    --pico-h4-color: #b3b9c5;
    --pico-h5-color: #a4acba;
    --pico-h6-color: #8891a4;
    --pico-mark-background-color: #014063;
    --pico-mark-color: #fff;
    --pico-ins-color: #62af9a;
    --pico-del-color: #ce7e7b;
    --pico-button-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    --pico-button-hover-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    --pico-form-element-background-color: #1c212c;
    --pico-form-element-selected-background-color: #2a3140;
    --pico-form-element-border-color: #2a3140;
    --pico-form-element-color: #e0e3e7;
    --pico-form-element-placeholder-color: #8891a4;
    --pico-form-element-active-background-color: #1a1f28;
    --pico-form-element-active-border-color: var(--pico-primary-border);
    --pico-form-element-focus-color: var(--pico-primary-border);
    --pico-form-element-disabled-opacity: 0.5;
    --pico-form-element-invalid-border-color: #964a50;
    --pico-form-element-invalid-active-border-color: #b7403b;
    --pico-form-element-invalid-focus-color: var(--pico-form-element-invalid-active-border-color);
    --pico-form-element-valid-border-color: #2a7b6f;
    --pico-form-element-valid-active-border-color: #16896a;
    --pico-form-element-valid-focus-color: var(--pico-form-element-valid-active-border-color);
    --pico-switch-background-color: #333c4e;
    --pico-switch-checked-background-color: var(--pico-primary-background);
    --pico-switch-color: #fff;
    --pico-switch-thumb-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    --pico-range-border-color: #202632;
    --pico-range-active-border-color: #2a3140;
    --pico-range-thumb-border-color: var(--pico-background-color);
    --pico-range-thumb-color: var(--pico-secondary-background);
    --pico-range-thumb-active-color: var(--pico-primary-background);
    --pico-progress-background-color: #202632;
    --pico-progress-color: var(--pico-primary-background);
    --pico-tooltip-background-color: var(--pico-contrast-background);
    --pico-tooltip-color: var(--pico-contrast-inverse);
    --pico-icon-valid: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(42, 123, 111)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
    --pico-icon-invalid: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(150, 74, 80)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E");
    color-scheme: dark;
  }
}

[data-theme=dark] {
  --pico-background-color: #13171f;
  --pico-color: #c2c7d0;
  --pico-text-selection-color: rgba(1, 170, 255, 0.1875);
  --pico-muted-color: #7b8495;
  --pico-muted-border-color: #202632;
  --pico-primary: #01aaff;
  --pico-primary-background: #0172ad;
  --pico-primary-border: var(--pico-primary-background);
  --pico-primary-underline: rgba(1, 170, 255, 0.5);
  --pico-primary-hover: #79c0ff;
  --pico-primary-hover-background: #017fc0;
  --pico-primary-hover-border: var(--pico-primary-hover-background);
  --pico-primary-hover-underline: var(--pico-primary-hover);
  --pico-primary-focus: rgba(1, 170, 255, 0.375);
  --pico-primary-inverse: #fff;
  --pico-secondary: #969eaf;
  --pico-secondary-background: #525f7a;
  --pico-secondary-border: var(--pico-secondary-background);
  --pico-secondary-underline: rgba(150, 158, 175, 0.5);
  --pico-secondary-hover: #b3b9c5;
  --pico-secondary-hover-background: #5d6b89;
  --pico-secondary-hover-border: var(--pico-secondary-hover-background);
  --pico-secondary-hover-underline: var(--pico-secondary-hover);
  --pico-secondary-focus: rgba(144, 158, 190, 0.25);
  --pico-secondary-inverse: #fff;
  --pico-contrast: #dfe3eb;
  --pico-contrast-background: #eff1f4;
  --pico-contrast-border: var(--pico-contrast-background);
  --pico-contrast-underline: rgba(223, 227, 235, 0.5);
  --pico-contrast-hover: #fff;
  --pico-contrast-hover-background: #fff;
  --pico-contrast-hover-border: var(--pico-contrast-hover-background);
  --pico-contrast-hover-underline: var(--pico-contrast-hover);
  --pico-contrast-focus: rgba(207, 213, 226, 0.25);
  --pico-contrast-inverse: #000;
  --pico-box-shadow: 0.0145rem 0.029rem 0.174rem rgba(7, 9, 12, 0.01698), 0.0335rem 0.067rem 0.402rem rgba(7, 9, 12, 0.024), 0.0625rem 0.125rem 0.75rem rgba(7, 9, 12, 0.03), 0.1125rem 0.225rem 1.35rem rgba(7, 9, 12, 0.036), 0.2085rem 0.417rem 2.502rem rgba(7, 9, 12, 0.04302), 0.5rem 1rem 6rem rgba(7, 9, 12, 0.06), 0 0 0 0.0625rem rgba(7, 9, 12, 0.015);
  --pico-h1-color: #f0f1f3;
  --pico-h2-color: #e0e3e7;
  --pico-h3-color: #c2c7d0;
  --pico-h4-color: #b3b9c5;
  --pico-h5-color: #a4acba;
  --pico-h6-color: #8891a4;
  --pico-mark-background-color: #014063;
  --pico-mark-color: #fff;
  --pico-ins-color: #62af9a;
  --pico-del-color: #ce7e7b;
  --pico-button-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  --pico-button-hover-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  --pico-form-element-background-color: #1c212c;
  --pico-form-element-selected-background-color: #2a3140;
  --pico-form-element-border-color: #2a3140;
  --pico-form-element-color: #e0e3e7;
  --pico-form-element-placeholder-color: #8891a4;
  --pico-form-element-active-background-color: #1a1f28;
  --pico-form-element-active-border-color: var(--pico-primary-border);
  --pico-form-element-focus-color: var(--pico-primary-border);
  --pico-form-element-disabled-opacity: 0.5;
  --pico-form-element-invalid-border-color: #964a50;
  --pico-form-element-invalid-active-border-color: #b7403b;
  --pico-form-element-invalid-focus-color: var(--pico-form-element-invalid-active-border-color);
  --pico-form-element-valid-border-color: #2a7b6f;
  --pico-form-element-valid-active-border-color: #16896a;
  --pico-form-element-valid-focus-color: var(--pico-form-element-valid-active-border-color);
  --pico-switch-background-color: #333c4e;
  --pico-switch-checked-background-color: var(--pico-primary-background);
  --pico-switch-color: #fff;
  --pico-switch-thumb-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  --pico-range-border-color: #202632;
  --pico-range-active-border-color: #2a3140;
  --pico-range-thumb-border-color: var(--pico-background-color);
  --pico-range-thumb-color: var(--pico-secondary-background);
  --pico-range-thumb-active-color: var(--pico-primary-background);
  --pico-progress-background-color: #202632;
  --pico-progress-color: var(--pico-primary-background);
  --pico-tooltip-background-color: var(--pico-contrast-background);
  --pico-tooltip-color: var(--pico-contrast-inverse);
  --pico-icon-valid: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(42, 123, 111)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  --pico-icon-invalid: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(150, 74, 80)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E");
  color-scheme: dark;
}

piwo-label[aria-disabled=true] piwo-checkbox:disabled,
piwo-label[aria-disabled=true] piwo-input:disabled {
  opacity: 1;
}
piwo-label:has(piwo-checkbox),
piwo-label:has(piwo-input) {
  width: fit-content;
  cursor: pointer;
}
piwo-label:has(:disabled) {
  cursor: default;
}
piwo-checkbox ~ piwo-label {
  display: inline-block;
  margin-bottom: 0;
  cursor: pointer;
}
piwo-checkbox:disabled ~ piwo-label {
  cursor: default;
}
piwo-checkbox ~ piwo-label:not(:last-of-type) {
  margin-inline-end: 1em;
}
fieldset[disabled] piwo-checkbox,
fieldset[disabled] piwo-input {
  opacity: var(--pico-form-element-disabled-opacity);
  pointer-events: none;
}
fieldset[disabled] piwo-checkbox {
  cursor: default;
}
fieldset[disabled] piwo-label {
  cursor: default;
}

[data-theme=light] piwo-button,
[data-theme=dark] piwo-button,
:root:not([data-theme]) piwo-button,
:root:not([data-theme=dark]) piwo-button {
  --pico-form-element-focus-color: var(--pico-primary-focus);
}
:root:not([data-theme]) piwo-button[aria-busy=true][kind=contrast]::before {
  filter: brightness(0);
}
[data-theme=dark] piwo-button[aria-busy=true][kind=contrast]::before {
  filter: brightness(0);
}
fieldset[disabled] piwo-button {
  opacity: var(--pico-form-element-disabled-opacity);
  pointer-events: none;
  cursor: default;
}
piwo-button ~ piwo-button {
  margin-inline-start: 1rem;
}

piwo-label > :where(piwo-input) {
  margin-top: calc(var(--pico-spacing) * 0.25);
}

:where(piwo-input, piwo-checkbox, fieldset) + piwo-msg {
  display: block;
  width: 100%;
  margin-top: calc(var(--pico-spacing) * -0.75);
  margin-bottom: var(--pico-spacing);
  color: var(--pico-muted-color);
}
:where(piwo-input, piwo-checkbox, fieldset)[aria-invalid=false] + piwo-msg {
  color: var(--pico-ins-color);
}
:where(piwo-input, piwo-checkbox, fieldset)[aria-invalid=true] + piwo-msg {
  color: var(--pico-del-color);
}
`);document.adoptedStyleSheets.push(r);const t=e(`
:host {
  --pico-outline-width: 0.0625rem;
  --pico-background-color: var(--pico-primary-background);
  --pico-border-color: var(--pico-primary-border);
  --pico-color: var(--pico-primary-inverse);
  --pico-box-shadow: var(--pico-button-box-shadow, 0 0 0 rgba(0, 0, 0, 0));
  margin: 0;
  overflow: visible;
  font-family: var(--pico-font-family);
  text-transform: none;
  appearance: button;
  padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);
  border: var(--pico-border-width) solid var(--pico-border-color);
  border-radius: var(--pico-border-radius);
  outline: none;
  background-color: var(--pico-background-color);
  box-shadow: var(--pico-box-shadow);
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  font-size: 1rem;
  line-height: var(--pico-line-height);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: background-color var(--pico-transition), border-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);
  margin-bottom: var(--pico-spacing);
  box-sizing: border-box;
  white-space: unset;
  display: inline-block;
}

:host(:is(:hover, :active, :focus)) {
  --pico-background-color: var(--pico-primary-hover-background);
  --pico-border-color: var(--pico-primary-hover-border);
  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0));
  --pico-color: var(--pico-primary-inverse);
}

:host(:focus) {
  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pico-primary-focus);
}

:host([kind=secondary]) {
  --pico-background-color: var(--pico-secondary-background);
  --pico-border-color: var(--pico-secondary-border);
  --pico-color: var(--pico-secondary-inverse);
  cursor: pointer;
}

:host([kind=secondary]:is(:hover, :active, :focus)) {
  --pico-background-color: var(--pico-secondary-hover-background);
  --pico-border-color: var(--pico-secondary-hover-border);
  --pico-color: var(--pico-secondary-inverse);
}

:host([kind=secondary]:focus) {
  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pico-secondary-focus);
}

:host([kind=contrast]) {
  --pico-background-color: var(--pico-contrast-background);
  --pico-border-color: var(--pico-contrast-border);
  --pico-color: var(--pico-contrast-inverse);
}

:host([kind=contrast]:is(:hover, :active, :focus)) {
  --pico-background-color: var(--pico-contrast-hover-background);
  --pico-border-color: var(--pico-contrast-hover-border);
  --pico-color: var(--pico-contrast-inverse);
}

:host([kind=contrast]:focus) {
  --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pico-contrast-focus);
}

:host([kind=outline]) {
  --pico-background-color: transparent;
  --pico-color: var(--pico-primary);
  --pico-border-color: var(--pico-primary);
}

:host([kind=outline]:is(:hover, :active, :focus)) {
  --pico-background-color: transparent;
  --pico-color: var(--pico-primary-hover);
  --pico-border-color: var(--pico-primary-hover);
}

:host(:disabled) {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}

:host([kind=secondary]:focus) {
  --pico-group-box-shadow-focus-with-button: 0 0 0 var(--pico-outline-width) var(--pico-secondary-focus);
}

:host([kind=contrast]:focus) {
  --pico-group-box-shadow-focus-with-button: 0 0 0 var(--pico-outline-width) var(--pico-contrast-focus);
}

:host([aria-busy=true]:not([kind=outline]))::before {
  filter: brightness(0) invert(1);
}

:host([hidden]) {
  display: none;
}

:host([type=submit]) {
  width: 100%;
}

:host([aria-busy=true]) {
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  :host(:not([aria-busy=true])), :host(:not([aria-busy=true]))::after, :host(:not([aria-busy=true]))::before {
    background-attachment: initial !important;
    animation-duration: 1ms !important;
    animation-delay: -1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-delay: 0s !important;
    transition-duration: 0s !important;
  }
}

input {
  display: none;
}
`);class a extends HTMLElement{#e;static get formAssociated(){return!0}constructor(){super(),this.#e=this.attachInternals(),this.#e.role="button",this.attachShadow({mode:"open"});let e=document.createElement("slot");for(let i in this.shadowRoot.appendChild(e),this.shadowRoot.adoptedStyleSheets=[t],this.addEventListener("click",e=>this.#o(e)),this.addEventListener("keyup",e=>this.#i(e)),a.observedAttributes)o(this,i)}get form(){return this.#e.form}#r="";get name(){return this.#r}set name(e){null==e&&(e=""),e!==this.name&&(this.#r=e,this.setAttribute("name",e))}get disabled(){return this.#e.states.has("disabled")}set disabled(e){(e=!!e)!==this.disabled&&(e?(this.#e.states.add("disabled"),this.getRootNode().activeElement===this&&this.blur(),this.tabIndex>=0&&(this.tabIndex=-1)):(this.#e.states.delete("disabled"),this.tabIndex<0&&(this.tabIndex=0)),this.#e.ariaDisabled=String(e))}static get observedAttributes(){return["disabled","name"]}attributeChangedCallback(e,o,i){switch(e){case"disabled":this.disabled=null!=i;break;case"name":this.name=i}}connectedCallback(){this.hasAttribute("tabindex")||(this.tabIndex=0)}#o(e){this.disabled||e.metaKey||e.altKey||e.ctrlKey||e.shiftKey||setTimeout(()=>{if(e.defaultPrevented)return;let o=this.#t();if(o){let e=this.getAttribute("type");e&&"submit"!==e?"reset"===e&&o.reset():this.#a(o)}})}#i(e){this.disabled||13!==e.keyCode&&32!==e.keyCode||e.metaKey||e.altKey||e.ctrlKey||e.shiftKey||this.click()}#t(){return this.form??function(e,o){for(let i;;){if(null===(i=e.parentElement))return null;if(i.tagName===o)return i}}(this,"FORM")}#a(e){let{name:o}=this;o&&this.#e.setFormValue(this.textContent.trim());let i=document.createElement("input");i.type="submit",this.insertAdjacentElement("afterend",i),e.submitter=i,e.requestSubmit(i),setTimeout(()=>{o&&this.#e.setFormValue(null),e.submitter=void 0,i.remove()})}}customElements.define("piwo-button",a);const n=e(`
:host {
  --pico-background-color: var(--pico-form-element-background-color);
  --pico-border-color: var(--pico-form-element-border-color);
  --pico-color: var(--pico-form-element-color);
  --pico-box-shadow: none;
  --pico-outline-width: 0.0625rem;
  --pico-border-width: 0.125rem;
  --pico-form-element-focus-color: var(--pico-primary-focus);
  box-sizing: border-box;
  background-repeat: no-repeat;
  display: inline-block;
  margin: 0;
  font-size: 1rem;
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
  letter-spacing: inherit;
  overflow: visible;
  border: var(--pico-border-width) solid var(--pico-border-color);
  border-radius: var(--pico-border-radius);
  outline: none;
  background-color: var(--pico-background-color);
  box-shadow: var(--pico-box-shadow);
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  transition: background-color var(--pico-transition), border-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);
  accent-color: var(--pico-primary);
  padding: 0;
  appearance: none;
  width: 1.25em;
  height: 1.25em;
  margin-top: -0.25em;
  margin-inline-end: 0.5em;
  border-width: var(--pico-border-width);
  vertical-align: middle;
  cursor: pointer;
}

:host(:is(:active, :focus)) {
  --pico-background-color: var(--pico-form-element-active-background-color);
  --pico-border-color: var(--pico-form-element-active-border-color);
}

:host(:focus) {
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-form-element-focus-color);
}

:host([aria-invalid=false]:focus) {
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-ins-color);
}

:host([aria-invalid=true]:focus) {
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-del-color);
}

/*:host(:focus-visible) {
  outline: 2px solid #00f;
  outline-offset: 3px;
}*/

:host(:disabled), :host(:state(readonly)) {
  opacity: var(--pico-form-element-disabled-opacity);
  pointer-events: none;
  cursor: default;
}

:host([aria-invalid=false]) {
  --pico-border-color: var(--pico-form-element-valid-border-color);
}

:host([aria-invalid=false]:is(:active, :focus)) {
  --pico-border-color: var(--pico-form-element-valid-active-border-color) !important;
}

:host([aria-invalid=true]) {
  --pico-border-color: var(--pico-form-element-invalid-border-color);
}

:host([aria-invalid=true]:is(:active, :focus)) {
  --pico-border-color: var(--pico-form-element-invalid-active-border-color) !important;
}

:host([hidden]) {
  display: none;
}

:host(:state(checked)), :host(:state(checked):active), :host(:state(checked):focus) {
  --pico-background-color: var(--pico-primary-background);
  --pico-border-color: var(--pico-primary-border);
  background-image: var(--pico-icon-checkbox);
  background-position: center;
  background-size: 0.75em auto;
  background-repeat: no-repeat;
}

:host(:state(indeterminate)) {
  --pico-background-color: var(--pico-primary-background);
  --pico-border-color: var(--pico-primary-border);
  background-image: var(--pico-icon-minus);
  background-position: center;
  background-size: 0.75em auto;
  background-repeat: no-repeat;
}

:host(:state(checked)[aria-invalid=false]),
:host(:state(checked)[aria-invalid=false]:active),
:host(:state(checked)[aria-invalid=false]:focus) {
  --pico-background-color: var(--pico-form-element-valid-border-color);
  --pico-border-color: var(--pico-form-element-valid-border-color);
}

:host(:state(checked)[aria-invalid=true]),
:host(:state(checked)[aria-invalid=true]:active),
:host(:state(checked)[aria-invalid=true]:focus) {
  --pico-background-color: var(--pico-form-element-invalid-border-color);
  --pico-border-color: var(--pico-form-element-invalid-border-color);
}

@media (prefers-reduced-motion: reduce) {
  :host(:not([aria-busy=true])), :host(:not([aria-busy=true]))::after, :host(:not([aria-busy=true]))::before {
    background-attachment: initial !important;
    animation-duration: 1ms !important;
    animation-delay: -1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-delay: 0s !important;
    transition-duration: 0s !important;
  }
}

input {
  display: none;
}

:host(:invalid) input {
  display: inline-block;
  width: 0;
  height: 0;
  padding: 0;
  border: none;
}
`),c=["disabled","readonly","required","describeerror"],s=c.concat("name");class l extends HTMLElement{#e;#n;static get formAssociated(){return!0}constructor(){for(let e in super(),this.#e=this.attachInternals(),this.#e.role="checkbox",this.#e.ariaChecked="false",this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[n],this.#n=document.createElement("input"),this.#n.ariaHidden="true",this.shadowRoot.appendChild(this.#n),this.addEventListener("click",e=>this.#o(e)),this.addEventListener("keyup",e=>this.#i(e)),this.addEventListener("invalid",e=>this.#c(e)),l.observedAttributes)o(this,e)}get form(){return this.#e.form}get labels(){let e=this.#e.labels;return e.length?e:i(this)}#r="";get name(){return this.#r}set name(e){null==e&&(e=""),e!==this.name&&(this.#r=e,this.setAttribute("name",e))}get type(){return this.localName}get checked(){return this.#s("checked")}set checked(e){this.#l("checked","Checked",!1,e)&&(this.#e.states.delete("indeterminate"),this.#d())}get indeterminate(){return this.#s("indeterminate")}set indeterminate(e){this.#l("indeterminate",void 0,!1,e)&&(e?this.#e.ariaChecked="mixed":this.#e.ariaChecked=String(this.checked))}#p=!1;get describeError(){return this.#p}set describeError(e){(e=!!e)!==this.describeError&&(this.#p=e,this.toggleAttribute("describeerror",e))}get disabled(){return this.#s("disabled")}set disabled(e){this.#l("disabled","Disabled",!0,e)&&(e?(this.getRootNode().activeElement===this&&this.blur(),this.tabIndex>=0&&(this.tabIndex=-1)):this.tabIndex<0&&(this.tabIndex=0))}get readonly(){return this.#s("readonly")}set readonly(e){this.#l("readonly","ReadOnly",!0,e)}get required(){return this.#s("required")}set required(e){this.#l("required","Required",!0,e)}#s(e){return this.#e.states.has(e)}#l(e,o,i,r){if((r=!!r)!==this[e])return r?this.#e.states.add(e):this.#e.states.delete(e),i&&this.toggleAttribute(e,r),o&&(this.#e[`aria${o}`]=String(r)),!0}static get observedAttributes(){return s}attributeChangedCallback(e,o,i){c.includes(e)?"describeerror"===e?this.describeError=null!=i:this[e]=null!=i:this[e]=i}connectedCallback(){this.hasAttribute("tabindex")||(this.tabIndex=0),this.checked=this.hasAttribute("checked"),this.hasAttribute("indeterminate")&&(this.indeterminate=!0),this.#d()}formResetCallback(){this.checked=this.hasAttribute("checked")}formStateRestoreCallback(e,o){this.checked="checked"===e}#o(e){this.disabled||this.readonly||e.metaKey||e.altKey||e.ctrlKey||e.shiftKey||setTimeout(()=>{if(e.defaultPrevented)return;let o=new CustomEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0});if(this.dispatchEvent(o),o.defaultPrevented)return;let i=!this.checked;this.checked=i,this.dispatchEvent(new CustomEvent("input",{bubbles:!0,cancelable:!1,composed:!0})),this.dispatchEvent(new CustomEvent("change",{detail:{checked:i},bubbles:!0,cancelable:!1,composed:!0}))})}#i(e){this.disabled||32!==e.keyCode||e.metaKey||e.altKey||e.ctrlKey||e.shiftKey||setTimeout(()=>{e.defaultPrevented||this.click()})}#c(e){(e.explicitOriginalTarget&&e.explicitOriginalTarget!==this||this.form.submitter)&&(this.ariaInvalid="true",this.describeError&&(e.preventDefault(),this.#h()))}#h(){let e=this.getAttribute("aria-describedby");if(e){let o=e.trim().split(/ +/).slice(-1)[0];if(o){let e=document.getElementById(o.trim());e&&(this.#m||(this.#m=e,this.#u=e.textContent,this.#u||(this.#m.style.display="")),e.textContent=this.validationMessage,this.focus())}}}get willValidate(){return this.#e.willValidate}get validity(){return this.#e.validity}get validationMessage(){return this.#e.validationMessage}checkValidity(){return this.#e.checkValidity()}reportValidity(){return this.ariaInvalid=String(!this.validity.valid),this.#e.reportValidity()}setCustomValidity(e){e?this.#e.setValidity({customError:!0},e,this.#n):this.#e.setValidity({})}#m;#u="";#d(){this.checked?this.#e.setFormValue("on","checked"):this.#e.setFormValue(null),this.required&&!this.checked?(this.#e.setValidity({valueMissing:!0},"Please check this box if you want to proceed.",this.#n),"true"===this.getAttribute("aria-invalid")&&this.#h()):(this.#e.setValidity({}),this.ariaInvalid=null,this.#m&&(this.#m.textContent=this.#u,this.#u||(this.#m.style.display="none"),this.#m=null,this.#u=""))}}customElements.define("piwo-checkbox",l);const d=e(`
:host {
  --pico-font-weight: 700;
  display: block;
  margin-top: 0;
  margin-bottom: var(--pico-typography-spacing-vertical);
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  font-size: var(--pico-font-size);
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
}

:host([level="1"]) {
  --pico-font-size: 2rem;
  --pico-line-height: 1.125;
  --pico-typography-spacing-top: 3rem;
  --pico-color: var(--pico-h1-color);
}

:host([level="2"]) {
  --pico-font-size: 1.75rem;
  --pico-line-height: 1.15;
  --pico-typography-spacing-top: 2.625rem;
  --pico-color: var(--pico-h2-color);
}

:host([level="3"]) {
  --pico-font-size: 1.5rem;
  --pico-line-height: 1.175;
  --pico-typography-spacing-top: 2.25rem;
  --pico-color: var(--pico-h3-color);
}

:host([level="4"]) {
  --pico-font-size: 1.25rem;
  --pico-line-height: 1.2;
  --pico-typography-spacing-top: 1.874rem;
  --pico-color: var(--pico-h4-color);
}

:host([level="5"]) {
  --pico-font-size: 1.125rem;
  --pico-line-height: 1.225;
  --pico-typography-spacing-top: 1.6875rem;
  --pico-color: var(--pico-h5-color);
}

:host([level=6]) {
  --pico-font-size: 1rem;
  --pico-line-height: 1.25;
  --pico-typography-spacing-top: 1.5rem;
  --pico-color: var(--pico-h6-color);
}

:host([hidden]) {
  display: none;
}
`);class p extends HTMLElement{#e;constructor(){super(),this.#e=this.attachInternals(),this.#e.role="heading",this.attachShadow({mode:"open"});let e=document.createElement("slot");this.shadowRoot.appendChild(e),this.shadowRoot.adoptedStyleSheets=[d],o(this,"level")}#b="";get level(){return this.#b}set level(e){null==e&&(e=""),e!==this.level&&(this.#e.ariaLevel=e,this.toggleAttribute("level",e))}static get observedAttributes(){return["level"]}attributeChangedCallback(e,o,i){this[e]=i}}customElements.define("piwo-h",p);const h=e(`
:host {
  display: inline-block;
  width: 100%;
}

input {
  --pico-outline-width: 0.0625rem;
  --pico-background-color: var(--pico-form-element-background-color);
  --pico-border-color: var(--pico-form-element-border-color);
  --pico-readonly-border-color: var(--pico-form-element-readonly-border-color);
  --pico-color: var(--pico-form-element-color);
  --pico-box-shadow: none;
  box-sizing: border-box;
  background-repeat: no-repeat;
  margin: 0;
  font-size: 1rem;
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
  letter-spacing: inherit;
  overflow: visible;
  height: calc(1rem * var(--pico-line-height) + var(--pico-form-element-spacing-vertical) * 2 + var(--pico-border-width) * 2);
  width: 100%;
  appearance: none;
  padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);
  border: var(--pico-border-width) solid var(--pico-border-color);
  border-radius: var(--pico-border-radius);
  outline: none;
  background-color: var(--pico-background-color);
  box-shadow: var(--pico-box-shadow);
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  transition: background-color var(--pico-transition), border-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);
  margin-bottom: var(--pico-spacing);
}

:host(:is(:active, :focus)) > input {
  --pico-background-color: var(--pico-form-element-active-background-color);
  --pico-border-color: var(--pico-form-element-active-border-color);
}

:host(:focus) > input {
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-form-element-focus-color);
}

:host([aria-invalid=false]:focus) {
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-ins-color);
}

:host([aria-invalid=true]:focus) {
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-del-color);
}

:host(:focus) > input,
:host(:focus-visible) > input {
  outline: none;
}

:host(:disabled) > input {
  opacity: var(--pico-form-element-disabled-opacity);
  pointer-events: none;
}

:host(:state(readonly)) > input {
  border-color: var(--pico-readonly-border-color);
}

:host([aria-invalid]) > input {
  padding-right: calc(var(--pico-form-element-spacing-horizontal) + 1.5rem) !important;
  padding-left: var(--pico-form-element-spacing-horizontal);
  padding-inline-start: var(--pico-form-element-spacing-horizontal) !important;
  padding-inline-end: calc(var(--pico-form-element-spacing-horizontal) + 1.5rem) !important;
  background-position: center right 0.75rem;
  background-size: 1rem auto;
  background-repeat: no-repeat;
}

:host([aria-invalid=false]) > input {
  --pico-border-color: var(--pico-form-element-valid-border-color);
  background-image: var(--pico-icon-valid);
}

:host([aria-invalid=true]) > input {
  --pico-border-color: var(--pico-form-element-invalid-border-color);
  background-image: var(--pico-icon-invalid);
}

:host([aria-invalid=false]:is(:active, :focus)) > input {
  --pico-border-color: var(--pico-form-element-valid-active-border-color) !important;
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-form-element-valid-focus-color) !important;
}

:host([aria-invalid=true]:is(:active, :focus)) > input {
  --pico-border-color: var(--pico-form-element-invalid-active-border-color) !important;
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-form-element-invalid-focus-color) !important;
}

:host(:dir(rtl):is([aria-invalid], [aria-invalid=true], [aria-invalid=false])) > input {
  background-position: center left 0.75rem;
}

input::placeholder {
  color: var(--pico-form-element-placeholder-color);
  opacity: 1;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
  scrollbar-width: none;
  word-wrap: normal;
  white-space: pre;
  border: 0;
  padding: inherit;
  margin: 0;
  text-decoration: inherit;
  display: inline-block;
  ime-mode: inherit;
}

input::selection {
  background-color: var(--pico-text-selection-color);
}

:host([hidden]) {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  :host(:not([aria-busy=true])), :host(:not([aria-busy=true]))::after, :host(:not([aria-busy=true]))::before {
    background-attachment: initial !important;
    animation-duration: 1ms !important;
    animation-delay: -1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-delay: 0s !important;
    transition-duration: 0s !important;
  }
}
`),m=["disabled","readonly","required","multiple","describeerror"],u=m.concat(["name","type","placeholder","autocomplete","step","pattern","max","min","maxLength","minLength"]);class b extends HTMLElement{#e;#g;static get formAssociated(){return!0}constructor(){for(let e in super(),this.#e=this.attachInternals(),this.#e.role="textbox",this.attachShadow({mode:"open",delegatesFocus:!0}),this.shadowRoot.adoptedStyleSheets=[h],this.#g=document.createElement("input"),this.#g.ariaHidden="true",this.shadowRoot.appendChild(this.#g),this.#g.addEventListener("beforeinput",e=>this.#v(e)),this.#g.addEventListener("input",e=>this.#f(e)),this.#g.addEventListener("change",e=>this.#y(e)),this.addEventListener("invalid",e=>this.#c(e)),b.observedAttributes)o(this,e)}get form(){return this.#e.form}get labels(){let e=this.#e.labels;return e.length?e:i(this)}#r="";get name(){return this.#r}set name(e){null==e&&(e=""),e!==this.name&&(this.#r=e,this.setAttribute("name",e))}#k="";get type(){return this.#k}set type(e){null==e&&(e=""),e!==this.type&&(this.#k=this.#g.type=e,this.setAttribute("type",this.#k))}#w="";get placeholder(){return this.#w}set placeholder(e){null==e&&(e=""),e!==this.placeholder&&(this.#w=this.#g.placeholder=e,this.setAttribute("placeholder",this.#w))}#x="";get value(){return this.#x}set value(e){null==e&&(e=""),e!==this.value&&(this.#x=this.#g.value=e,this.#d())}#E="";get autocomplete(){return this.#E}set autocomplete(e){null==e&&(e=""),e!==this.autocomplete&&(this.#E=this.#g.autocomplete=e,this.setAttribute("autocomplete",e))}#C="";get max(){return this.#C}set max(e){null==e&&(e=""),e!==this.max&&(this.#C=this.#g.max=e,this.setAttribute("max",e))}#I="";get min(){return this.#I}set min(e){null==e&&(e=""),e!==this.min&&(this.#I=this.#g.min=e,this.setAttribute("min",e))}#A=-1;get maxLength(){return this.#A}set maxLength(e){null==e?e=-1:Number.isNaN(e=+e)&&(e=-1),e!==this.maxLength&&(this.#A=this.#g.maxLength=e,this.setAttribute("maxlength",e))}#z=-1;get minLength(){return this.#z}set minLength(e){null==e?e=-1:Number.isNaN(e=+e)&&(e=-1),e!==this.minLength&&(this.#z=this.#g.minLength=e,this.setAttribute("minlength",e))}#S=!1;get multiple(){return this.#S}set multiple(e){(e=!!e)!==this.multiple&&(this.#S=this.#g.multiple=e,this.toggleAttribute("multiple",e))}#p=!1;get describeError(){return this.#p}set describeError(e){(e=!!e)!==this.describeError&&(this.#p=e,this.toggleAttribute("describeerror",e))}#L="";get pattern(){return this.#L}set pattern(e){null==e&&(e=""),e!==this.pattern&&(this.#L=this.#g.pattern=e,this.setAttribute("pattern",e))}#F="";get step(){return this.#F}set step(e){null==e&&(e=""),e!==this.step&&(this.#F=this.#g.step=e,this.setAttribute("step",e))}get disabled(){return this.#s("disabled")}set disabled(e){this.#l("disabled","Disabled",!0,e)&&(e?(this.getRootNode().activeElement===this&&this.blur(),this.tabIndex>=0&&(this.tabIndex=-1)):this.tabIndex<0&&(this.tabIndex=0))}get readonly(){return this.#s("readonly")}set readonly(e){this.#l("readonly","ReadOnly",!0,e)}get required(){return this.#s("required")}set required(e){this.#l("required","Required",!0,e)}#s(e){return this.#e.states.has(e)}#l(e,o,i,r){if((r=!!r)!==this[e])return r?this.#e.states.add(e):this.#e.states.delete(e),this.#g[e]=r,i&&(this.toggleAttribute(e,r),this.#g.toggleAttribute(e,r)),o&&(this.#e[`aria${o}`]=String(r)),!0}static get observedAttributes(){return u}attributeChangedCallback(e,o,i){m.includes(e)?"describeerror"===e?this.describeError=null!=i:this[e]=null!=i:this[e]=i}connectedCallback(){this.hasAttribute("tabindex")||(this.tabIndex=0),this.value=this.getAttribute("value"),this.#d()}formResetCallback(){this.value=this.getAttribute("value")}formStateRestoreCallback(e,o){this.value=e}formDisabledCallback(e){this.#g.disabled=e}#v(e){this.#V(e).defaultPrevented&&e.preventDefault()}#f(e){this.value=this.#g.value,this.#V(e)}#y(e){this.value=this.#g.value,this.#V(e)}#c(e){(e.explicitOriginalTarget&&e.explicitOriginalTarget!==this||this.form.submitter)&&(this.ariaInvalid="true",this.describeError&&(e.preventDefault(),this.#h()))}#h(){let e=this.getAttribute("aria-describedby");if(e){let o=e.trim().split(/ +/).slice(-1)[0];if(o){let e=document.getElementById(o.trim());e&&(this.#m||(this.#m=e,this.#u=e.textContent,this.#u||(this.#m.style.display="")),e.textContent=this.validationMessage,this.focus())}}}#V(e){let o=new e.constructor(e.type,e);return this.dispatchEvent(o),o}get willValidate(){return this.#e.willValidate}get validity(){return this.#e.validity}get validationMessage(){return this.#e.validationMessage}checkValidity(){return this.#e.checkValidity()&&this.#g.checkValidity()}reportValidity(){return this.ariaInvalid=String(!this.validity.valid),this.#e.reportValidity()&&this.#e.checkValidity()}setCustomValidity(e){e?this.#e.setValidity({customError:!0},e,this.#g):this.#e.setValidity({})}#m;#u="";#d(){this.#e.setFormValue(this.#x,this.#x);let{validity:e}=this.#g;e.valid?(this.#e.setValidity({}),this.ariaInvalid=null,this.#m&&(this.#m.textContent=this.#u,this.#u||(this.#m.style.display="none"),this.#m=null,this.#u="")):(this.#e.setValidity(e,this.#g.validationMessage,this.#g),"true"===this.getAttribute("aria-invalid")&&this.#h())}}customElements.define("piwo-input",b);const g=e(`
:host {
  font-size: var(--pico-font-size);
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
  text-underline-offset: var(--pico-text-underline-offset);
  text-rendering: optimizeLegibility;
  overflow-wrap: break-word;
  tab-size: 4;
  display: block;
  margin-bottom: calc(var(--pico-spacing) * .375);
  color: var(--pico-color);
  font-weight: var(--pico-form-label-font-weight, var(--pico-font-weight));
  box-sizing: border-box;
  background-repeat: no-repeat;
  cursor: default;
}

:host([aria-disabled=true]) {
  opacity: var(--pico-form-element-disabled-opacity);
  pointer-events: none;
}

:host([hidden]) {
  display: none;
}
`);let v=0;class f extends HTMLElement{#M;constructor(){super(),this.attachShadow({mode:"open"}),this.#M=document.createElement("slot"),this.shadowRoot.appendChild(this.#M),this.shadowRoot.adoptedStyleSheets=[g],this.#M.addEventListener("slotchange",()=>this.#R()),this.addEventListener("click",e=>this.#o(e)),o(this,"htmlFor")}#K="";get htmlFor(){return this.#K}set htmlFor(e){null==e&&(e=""),e!==this.htmlFor&&(this.#K=e,this.setAttribute("for",e),this.#R())}static get observedAttributes(){return["for"]}attributeChangedCallback(e,o,i){this.htmlFor=i}#o(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;let o=this.#T();o&&!o.disabled&&e.target!==o&&(o.focus(),o.click())}async #R(){await Promise.resolve(),this.id||(this.id=`label${v++}`);let e=this.#T(),o=this.#N();o&&e!==o&&(e&&e.removeAttribute("aria-labelledby"),o.setAttribute("aria-labelledby",this.id))}#T(){return this.getRootNode().querySelector(`[aria-labelledby="${this.id}"]`)}#N(){let e=this.htmlFor;if(e)return this.getRootNode().getElementById(e);let o=this.#M.assignedElements({flatten:!0});return o.find(({labels:e})=>e)??o[0]}}customElements.define("piwo-label",f);const y=e(`
:host {
  --pico-font-size: 0.875em;
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  font-size: var(--pico-font-size);
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
  text-underline-offset: var(--pico-text-underline-offset);
  text-rendering: optimizeLegibility;
  overflow-wrap: break-word;
  tab-size: 4;
  box-sizing: border-box;
  background-repeat: no-repeat;
}

:host([hidden]) {
  display: none;
}

@media (min-width: 768px) {
  --pico-block-spacing-vertical: calc(var(--pico-spacing) * 1.5);
  --pico-block-spacing-horizontal: calc(var(--pico-spacing) * 1.5);
}
@media (min-width: 576px) {
  --pico-block-spacing-vertical: calc(var(--pico-spacing) * 1.25);
  --pico-block-spacing-horizontal: calc(var(--pico-spacing) * 1.25);
}
`);class k extends HTMLElement{#M;constructor(){super(),this.attachShadow({mode:"open"}),this.#M=document.createElement("slot"),this.shadowRoot.appendChild(this.#M),this.shadowRoot.adoptedStyleSheets=[y]}}customElements.define("piwo-msg",k);const w=e(`
:host {
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  font-size: var(--pico-font-size);
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
  text-underline-offset: var(--pico-text-underline-offset);
  text-rendering: optimizeLegibility;
  overflow-wrap: break-word;
  tab-size: 4;
  margin-bottom: var(--pico-typography-spacing-vertical);
  margin-top: 0;
  margin-bottom: var(--pico-typography-spacing-vertical);
  color: var(--pico-color);
  font-style: normal;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;

  @media (min-width: 768px) {
    --pico-block-spacing-vertical: calc(var(--pico-spacing) * 1.5);
  }
  @media (min-width: 576px) {
    --pico-block-spacing-vertical: calc(var(--pico-spacing) * 1.25);
  }
}

:host([hidden]) {
  display: none;
}
`);class x extends HTMLElement{#e;constructor(){super(),this.#e=this.attachInternals(),this.#e.role="paragraph",this.attachShadow({mode:"open"});let e=document.createElement("slot");this.shadowRoot.appendChild(e),this.shadowRoot.adoptedStyleSheets=[w]}}customElements.define("piwo-p",x);const E=e(`
:host {
  --pico-spacing-factor: 1;
  display: block;
  height: calc(var(--pico-spacing) * var(--pico-spacing-factor));
  font-size: var(--pico-font-size);
  line-height: var(--pico-line-height);
  font-family: var(--pico-font-family);
}

:host([typography]) {
  margin-bottom: var(--pico-typography-spacing-vertical);
}

:host([hidden]) {
  display: none;
}
`);class C extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[E],o(this,"factor"),o(this,"typography")}#j=1;get factor(){return this.#j}set factor(e){null==e?e=1:Number.isNaN(e=+e)&&(e=1),e!==this.factor&&(this.#j=e,this.setAttribute("factor",String(e)),this.#q())}#B=!1;get typography(){return this.#B}set typography(e){(e=!!e)!==this.typography&&(this.#B=e,this.toggleAttribute("typography",e))}static get observedAttributes(){return["factor","typography"]}attributeChangedCallback(e,o,i){this[e]=i}#q(){1!==this.factor?this.style.setProperty("--pico-spacing-factor",this.factor):this.style.removeProperty("--pico-spacing-factor")}}customElements.define("piwo-spacer",C);
//# sourceMappingURL=index.min.mjs.map
