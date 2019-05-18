import { createGlobalStyle } from 'styled-components'
import FontAwesomeWOFF2 from './fonts/fontawesome-webfont.woff2'

const fonts = {
    FontAwesomeWOFF2
}
const Global = createGlobalStyle`
    body {
        background-color: #f1f3f4;
        font-family: sans-serif;
    }
    @font-face {
        font-family: 'FontAwesome';
        src: url("./fonts/fontawesome-webfont.woff2") format("woff2");
    }
`

export { Global }