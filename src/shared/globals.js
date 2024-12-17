import { createStylesheet } from './helpers.js'

const stylesheet = createStylesheet(`
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
`)

document.adoptedStyleSheets.push(stylesheet)
