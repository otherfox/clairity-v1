import ClairityLightTheme from './clairityLight.js'
import {Styles} from 'material-ui'

let ThemeManager = new Styles.ThemeManager();
let ClairityDarkTheme = ThemeManager.types.DARK;

ThemeManager.setTheme(ClairityLightTheme);

export default ThemeManager;
