import { createStylesheet } from './helpers.js'
import styles from './globals.css'

const stylesheet = createStylesheet(styles)
document.adoptedStyleSheets.push(stylesheet)
