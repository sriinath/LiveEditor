import { createGlobalStyle } from 'styled-components'
import FontAwesomeTTF from './fonts/FontAwesome.ttf'
import FontAwesomeWOFF from './fonts/fontawesome-webfont.woff'
import FontAwesomeWOFF2 from './fonts/fontawesome-webfont.woff2'

const fonts = {
    FontAwesomeTTF,
    FontAwesomeWOFF,
    FontAwesomeWOFF2
}
const Global = createGlobalStyle`
    body {
        background-color: #f1f3f4;
        font-family: sans-serif;
    }
    @font-face {
        font-family: 'FontAwesome';
        src: url("./fonts/FontAwesome.ttf") format("truetype"),
        url("./fonts/fontawesome-webfont.woff") format("woff"),
        url("./fonts/fontawesome-webfont.woff2") format("woff2");
    }
`

export { Global }