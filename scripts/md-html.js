import { readFile } from 'node:fs/promises'
import { marked } from 'marked'
import pkg from '../package.json' with { type: 'json' }

const prolog = `<html lang=en>
<head>
<meta charset=utf-8>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="icon" href="data:image/png;base64,iVBORw0KGgo=">
<title>PiWo - Pico Web Components</title>
<style>
#wrapper {
  color: #24292e;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  margin: 0 auto;
  text-size-adjust: 100%;
  max-width: 980px !important;
  padding: 40px 48px 48px !important;
}
#wrapper aside,
#wrapper article,
#wrapper details,
#wrapper figcaption,
#wrapper figure,
#wrapper footer,
#wrapper header,
#wrapper hgroup,
#wrapper main,
#wrapper menu,
#wrapper nav,
#wrapper section,
#wrapper summary {
  display: block;
}
#wrapper audio,
#wrapper canvas,
#wrapper progress,
#wrapper video {
  display: inline-block;
  vertical-align: baseline;
}
#wrapper audio:not([controls]) {
  display: none;
  height: 0;
}
#wrapper [hidden],
#wrapper template {
  display: none;
}
#wrapper a {
  background-color: transparent;
}
#wrapper a:active, #wrapper a:hover {
  outline: 0;
}
#wrapper abbr[title] {
  border-bottom: 1px dotted;
}
#wrapper b,
#wrapper strong {
  font-weight: bold;
}
#wrapper dfn {
  font-style: italic;
}
#wrapper mark {
  background: #ff0;
  color: #000;
}
#wrapper small {
  font-size: 80%;
}
#wrapper sub,
#wrapper sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
#wrapper sup {
  top: -.5em;
}
#wrapper sub {
  bottom: -.25em;
}
#wrapper img {
  border: 0;
}
#wrapper svg:not(:root) {
  overflow: hidden;
}
#wrapper figure {
  margin: 1em 40px;
}
#wrapper hr {
  box-sizing: content-box;
  height: 0;
}
#wrapper pre {
  overflow: auto;
}
#wrapper code,
#wrapper kbd,
#wrapper pre,
#wrapper samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
#wrapper button,
#wrapper input,
#wrapper optgroup,
#wrapper select,
#wrapper textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}
#wrapper button {
  overflow: visible;
}
#wrapper button,
#wrapper select {
  text-transform: none;
}
#wrapper button,
#wrapper input[type='button'],
#wrapper input[type='reset'],
#wrapper input[type='submit'] {
  -webkit-appearance: button;
  cursor: pointer;
}
#wrapper button[disabled] {
  cursor: default;
}
#wrapper button::-moz-focus-inner,
#wrapper input::-moz-focus-inner {
  border: 0;
  padding: 0;
}
#wrapper input {
  line-height: normal;
}
#wrapper input[type='checkbox'], #wrapper input[type='radio'] {
  box-sizing: border-box;
  padding: 0;
}
#wrapper input[type='number']::-webkit-inner-spin-button,
#wrapper input[type='number']::-webkit-outer-spin-button {
  height: auto;
}
#wrapper input[type='search'] {
  -webkit-appearance: textfield;
  box-sizing: content-box;
}
#wrapper input[type='search']::-webkit-search-cancel-button,
#wrapper input[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}
#wrapper fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}
#wrapper legend {
  border: 0;
  padding: 0;
}
#wrapper textarea {
  overflow: auto;
}
#wrapper optgroup {
  font-weight: bold;
}
#wrapper table {
  border-collapse: collapse;
  border-spacing: 0;
}
#wrapper * {
  box-sizing: border-box;
}
#wrapper input,
#wrapper select,
#wrapper textarea,
#wrapper button {
  font: 14px/21px -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
#wrapper body {
  font: 14px/21px -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  color: #333;
  background-color: #fff;
}
#wrapper a {
  color: #4078c0;
  text-decoration: none;
}
#wrapper a:hover,
#wrapper a:active {
  text-decoration: underline;
}
#wrapper hr,
#wrapper .rule {
  background: transparent;
  border: 0;
  border-bottom: 1px solid #ddd;
  height: 0;
  margin: 15px 0;
  overflow: hidden;
}
#wrapper hr:before,
#wrapper .rule:before {
  content: '';
  display: table;
}
#wrapper hr:after,
#wrapper .rule:after {
  clear: both;
  content: '';
  display: table;
}
#wrapper h1,
#wrapper h2,
#wrapper h3,
#wrapper h4,
#wrapper h5,
#wrapper h6 {
  font-weight: 600;
  line-height: 1.1;
  margin: 24px 0 16px;
  padding: 0;
}

#wrapper h1 code,
#wrapper h2 code,
#wrapper h3 code,
#wrapper h4 code,
#wrapper h5 code,
#wrapper h6 code {
  font-size: inherit;
}
#wrapper h1,
#wrapper h2 {
  border-bottom: 1px solid #eaecef;
}
#wrapper h1 {
  font-size: 32px;
  line-height: 40px;
  margin: 0 0 16px;
  padding: 0 0 9.600000381469727px;
}
#wrapper h2 {
  font-size: 24px;
  line-height: 30px;
  padding: 0 0 7.199999809265137px;
}
#wrapper h3 {
  font-size: 20px;
  line-height: 25px;
}
#wrapper h4 {
  font-size: 16px;
  line-height: 20px;
  margin: 24px 0 16px;
  padding: 0;
}
#wrapper h5 {
  font-size: 14px;
  line-height: 17px;
}
#wrapper h6 {
  font-size: 13.600000381469727px;
  line-height: 17px;
}
#wrapper small {
  font-size: 90%;
}
#wrapper blockquote {
  margin: 0;
}
#wrapper ol ol,
#wrapper ul ol {
  list-style-type: lower-roman;
}
#wrapper ul ul ol,
#wrapper ul ol ol,
#wrapper ol ul ol,
#wrapper ol ol ol {
  list-style-type: lower-alpha;
}
#wrapper dd {
  margin-left: 0;
}
#wrapper tt,
#wrapper code {
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  font-size: 85%;
}
#wrapper pre {
  font: 100% SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  margin-bottom: 0;
  margin-top: 16px;
  line-height: 1.45;
  padding: 10px;
  border-radius: 3px;
}

#wrapper {
  -webkit-font-smoothing: antialiased;
  background: #fff;
  border: solid 1px #dddddd !important;
  border-radius: 3px;
  color: #333;
  font: 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  line-height: 1.6;
  padding: 3px;
}

p {
  margin: 1em 0;
}

a {
  color: #4183c4;
  text-decoration: none;
}

#wrapper {
  background-color: #fff;
  font-size: 16px;
  line-height: 1.6;
  margin: 15px;
  padding: 30px;
}
#wrapper > *:first-child {
  margin-top: 0 !important;
}
#wrapper > *:last-child {
  margin-bottom: 0 !important;
}

@media screen {
  #wrapper {
    border: solid 1px #ddd;
  }
}
p, blockquote, ul, ol, dl, table, pre {
  margin-bottom: 16px;
}

hr {
  height: 4px;
  padding: 0;
  margin: 16px 0;
  background-color: #e7e7e7;
  border: 0 none;
}

ul, ol {
  padding-left: 2em;
}

ul.no-list, ol.no-list {
  padding: 0;
  list-style-type: none;
}

ul ul, ul ol {
  margin-top: 0;
  margin-bottom: 0;
}

ol ol, ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

li > p {
  margin-bottom: 0;
}
li p + p {
  margin-top: 16px;
}

dl {
  padding: 0;
}
dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: 700;
}
dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}

blockquote {
  padding: 0 15px;
  margin-left: 0;
  color: #777;
  border-left: 4px solid #ddd;
}
blockquote > :first-child {
  margin-top: 0;
}
blockquote > :last-child {
  margin-bottom: 0;
}

table {
  display: block;
  width: 100%;
  overflow: auto;
}
table th {
  font-weight: 700;
  padding: 6px 13px;
  border: 1px solid #ddd;
}
table td {
  padding: 6px 13px;
  border: 1px solid #ddd;
}
table tr {
  background-color: #fff;
  border-top: 1px solid #ccc;
}
table tr:nth-child(2n) {
  background-color: #f8f8f8;
}

img {
  max-width: 100%;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

span.frame {
  display: block;
  overflow: hidden;
}
span.frame > span {
  display: block;
  float: left;
  width: auto;
  padding: 7px;
  margin: 13px 0 0;
  overflow: hidden;
  border: 1px solid #ddd;
}
span.frame span img {
  display: block;
  float: left;
}
span.frame span span {
  display: block;
  padding: 5px 0 0;
  clear: both;
  color: #333;
}
span.align-center {
  display: block;
  overflow: hidden;
  clear: both;
}
span.align-center > span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: center;
}
span.align-center span img {
  margin: 0 auto;
  text-align: center;
}
span.align-right {
  display: block;
  overflow: hidden;
  clear: both;
}
span.align-right > span {
  display: block;
  margin: 13px 0 0;
  overflow: hidden;
  text-align: right;
}
span.align-right span img {
  margin: 0;
  text-align: right;
}
span.float-left {
  display: block;
  float: left;
  margin-right: 13px;
  overflow: hidden;
}
span.float-left span {
  margin: 13px 0 0;
}
span.float-right {
  display: block;
  float: right;
  margin-left: 13px;
  overflow: hidden;
}
span.float-right > span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: right;
}

code, tt {
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  font-size: 85%;
  margin: 0;
  padding: .2em .4em;
}

code::before, code::after {
  content: '\\00a0';
  letter-spacing: -.2em;
}

tt:before, tt:after {
  content: '\\00a0';
  letter-spacing: -.2em;
}

code br, tt br {
  display: none;
}

del code {
  text-decoration: inherit;
  vertical-align: text-top;
}

pre > code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  white-space: pre;
  background: transparent;
  border: 0;
}

.highlight {
  margin-bottom: 16px;
}
.highlight pre {
  padding: 16px;
  margin-bottom: 0;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}

pre {
  padding: 16px;
  margin-bottom: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f7f7f7;
  border-radius: 3px;
  word-wrap: normal;
}
pre code, pre tt {
  display: inline;
  max-width: initial;
  padding: 0;
  margin: 0;
  overflow: initial;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}
pre code:before, pre code:after {
  content: normal;
}
pre tt:before, pre tt:after {
  content: normal;
}

.poetry pre {
  font-family: Georgia, Garamond, serif !important;
  font-style: italic;
  font-size: 110% !important;
  line-height: 1.6em;
  display: block;
  margin-left: 1em;
}
.poetry pre code {
  font-family: Georgia, Garamond, serif !important;
  word-break: break-all;
  word-break: break-word;
  /* Non standard for webkit */
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
  white-space: pre-wrap;
}

sup, sub, a.footnote {
  font-size: 1.4ex;
  height: 0;
  line-height: 1;
  vertical-align: super;
  position: relative;
}

sub {
  vertical-align: sub;
  top: -1px;
}

@media print {
  body {
    background: #fff;
  }

  img, table, figure {
    page-break-inside: avoid;
  }

  #wrapper {
    background: #fff;
    border: none !important;
    font-size: 12px;
  }

  pre code {
    overflow: visible;
  }
}
@media screen {
  body.inverted {
    border-color: #555;
    box-shadow: none;
    color: #eee !important;
  }

  .inverted #wrapper,
  .inverted hr,
  .inverted p,
  .inverted td,
  .inverted li,
  .inverted h1,
  .inverted h2,
  .inverted h3,
  .inverted h4,
  .inverted h5,
  .inverted h6,
  .inverted th,
  .inverted .math,
  .inverted caption,
  .inverted dd,
  .inverted dt,
  .inverted blockquote {
    border-color: #555;
    box-shadow: none;
    color: #eee !important;
  }
  .inverted td, .inverted th {
    background: #333;
  }
  .inverted pre, .inverted code, .inverted tt {
    background: #eeeeee !important;
    color: #111;
  }
  .inverted h2 {
    border-color: #555555;
  }
  .inverted hr {
    border-color: #777;
    border-width: 1px !important;
  }

  ::selection {
    background: rgba(157, 193, 200, 0.5);
  }

  h1::selection {
    background-color: rgba(45, 156, 208, 0.3);
  }

  h2::selection {
    background-color: rgba(90, 182, 224, 0.3);
  }

  h3::selection,
  h4::selection,
  h5::selection,
  h6::selection,
  li::selection,
  ol::selection {
    background-color: rgba(133, 201, 232, 0.3);
  }

  code::selection {
    background-color: rgba(0, 0, 0, 0.7);
    color: #eeeeee;
  }
  code span::selection {
    background-color: rgba(0, 0, 0, 0.7) !important;
    color: #eeeeee !important;
  }

  a::selection {
    background-color: rgba(255, 230, 102, 0.2);
  }

  .inverted a::selection {
    background-color: rgba(255, 230, 102, 0.6);
  }

  td::selection, th::selection, caption::selection {
    background-color: rgba(180, 237, 95, 0.5);
  }

  .inverted {
    background: #0b2531;
    background: #252a2a;
  }
  .inverted #wrapper {
    background: #252a2a;
  }
  .inverted a {
    color: #acd1d5;
  }
}
.highlight {
  background: #fff;
}
.highlight .c {
  color: #998;
  font-style: italic;
}
.highlight .err {
  color: #a61717;
  background-color: #e3d2d2;
}
.highlight .k, .highlight .o {
  font-weight: 700;
}
.highlight .cm {
  color: #998;
  font-style: italic;
}
.highlight .cp {
  color: #999;
  font-weight: 700;
}
.highlight .c1 {
  color: #998;
  font-style: italic;
}
.highlight .cs {
  color: #999;
  font-weight: 700;
  font-style: italic;
}
.highlight .gd {
  color: #000;
  background-color: #fdd;
}
.highlight .gd .x {
  color: #000;
  background-color: #faa;
}
.highlight .ge {
  font-style: italic;
}
.highlight .gr {
  color: #a00;
}
.highlight .gh {
  color: #999;
}
.highlight .gi {
  color: #000;
  background-color: #dfd;
}
.highlight .gi .x {
  color: #000;
  background-color: #afa;
}
.highlight .go {
  color: #888;
}
.highlight .gp {
  color: #555;
}
.highlight .gs {
  font-weight: 700;
}
.highlight .gu {
  color: purple;
  font-weight: 700;
}
.highlight .gt {
  color: #a00;
}
.highlight .kc, .highlight .kd, .highlight .kn, .highlight .kp, .highlight .kr {
  font-weight: 700;
}
.highlight .kt {
  color: #458;
  font-weight: 700;
}
.highlight .m {
  color: #099;
}
.highlight .s {
  color: #d14;
}
.highlight .n {
  color: #333;
}
.highlight .na {
  color: teal;
}
.highlight .nb {
  color: #0086b3;
}
.highlight .nc {
  color: #458;
  font-weight: 700;
}
.highlight .no {
  color: teal;
}
.highlight .ni {
  color: purple;
}
.highlight .ne, .highlight .nf {
  color: #900;
  font-weight: 700;
}
.highlight .nn {
  color: #555;
}
.highlight .nt {
  color: navy;
}
.highlight .nv {
  color: teal;
}
.highlight .ow {
  font-weight: 700;
}
.highlight .w {
  color: #bbb;
}
.highlight .mf, .highlight .mh, .highlight .mi, .highlight .mo {
  color: #099;
}
.highlight .sb, .highlight .sc, .highlight .sd, .highlight .s2, .highlight .se, .highlight .sh, .highlight .si, .highlight .sx {
  color: #d14;
}
.highlight .sr {
  color: #009926;
}
.highlight .s1 {
  color: #d14;
}
.highlight .ss {
  color: #990073;
}
.highlight .bp {
  color: #999;
}
.highlight .vc, .highlight .vg, .highlight .vi {
  color: teal;
}
.highlight .il {
  color: #099;
}
.highlight .gc {
  color: #999;
  background-color: #EAF2F5;
}

.type-csharp .highlight .k, .type-csharp .highlight .kt {
  color: blue;
}
.type-csharp .highlight .nf {
  color: #000;
  font-weight: 400;
}
.type-csharp .highlight .nc {
  color: #2b91af;
}
.type-csharp .highlight .nn {
  color: #000;
}
.type-csharp .highlight .s, .type-csharp .highlight .sc {
  color: #a31515;
}

.type-csharp .highlight .k, .type-csharp .highlight .kt {
  color: #00F;
}
.type-csharp .highlight .nf {
  color: #000;
  font-weight: normal;
}
.type-csharp .highlight .nc {
  color: #2B91AF;
}
.type-csharp .highlight .nn {
  color: #000;
}
.type-csharp .highlight .s, .type-csharp .highlight .sc {
  color: #A31515;
}

[data-theme=dark] #wrapper {
  background: transparent !important;
  box-shadow: none !important;
  color: #c2c7d0;
}

[data-theme=dark] #wrapper pre {
  background: #1c212c;
}

.live-code {
  border-top: 1px #888 solid;
  border-bottom: 1px #888 solid;
  padding-top: 1rem;
}

#theme-toggle#theme-toggle {
  margin: 0;
  border: 0;
  border-radius: 50%;
  padding: 2px 4px;
  font-size: 1.75rem;
  line-height: 2rem;
  background-color: transparent;
  float: inline-end;
}
#theme-toggle#theme-toggle:is(:hover, :active) {
  background-color: #f7f7f7;
}
[data-theme=dark] #theme-toggle#theme-toggle:is(:hover, :active) {
  background-color: #1c212c;
}
html:not([data-theme]) #theme-toggle::before,
[data-theme=light] #theme-toggle::before {
  content: '\\1F31E';
}
[data-theme=dark] #theme-toggle::before {
  content: '\\1F31C';
}
#github#github {
  float: right;
  height: 36px;
  width: 36px;
  display: block;
  padding: 6px;
  margin: 0 8px 0 0;
  border: 0;
  border-radius: 50%;
  background-color: transparent;
  float: inline-end;
}
#github#github svg {
  fill: rgb(24, 28, 37);
}
#github#github:is(:hover, :active) {
  background-color: #f7f7f7;
}
[data-theme=dark] #github#github:is(:hover, :active) {
  background-color: #1c212c;
}
[data-theme=dark] #github#github svg {
  fill: rgb(223, 227, 235);
}
</style>
</head>
<body id="wrapper">
<button id="theme-toggle" aria-label="Turn on dark mode"></button>
<a id="github" rel="noopener noreferrer" aria-label="GitHub repository" href="https://github.com/prantlf/piwo">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="icon-github"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
</a>
`

const epilog = `<hr>
<small>PiWo ${pkg.version}</small>
<script type="module">
import { registerField, registerForm } from './event-logger.js'
registerField('piwo-input, piwo-checkbox, piwo-textarea')
registerForm('login')
const themeToggle = document.getElementById('theme-toggle')
themeToggle.addEventListener('click', () => {
let { theme } = document.documentElement.dataset
let verb
if (theme !== 'dark') {
  theme = 'dark'
  verb = 'on'
} else {
  theme = 'light'
  verb = 'off'
}
document.documentElement.dataset.theme = theme
themeToggle.ariaLabel = \`Turn \${verb} dark mode\`
})
</script>
<script src="index.min.mjs" type="module"></script>
</body>
</html>
`

function escapeHtml(text) {
  return (
    text
      .replace(/&/g, '&amp;')
      // .replace(/"/g, '&quot;')
      // .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  )
}

marked.use({
  extensions: [{
    name: 'code',
    renderer({ lang, text }) {
      if (!lang || text.startsWith('<script')) return false
      return `<pre><code class="language-${lang}">
${escapeHtml(text)}
</code></pre>
<div class="live-code">
${text}
</div>
`
    }
  }]
})

const md = await readFile('README.md', 'utf8')
const html = `${prolog}${marked.parse(md)}${epilog}`
console.log(html)
