import _ from 'lodash'
import {ThemeManager, ClairityLight, ClairityDark} from '../themes'

const themesMap = {
  light: ClairityLight,
  dark: ClairityDark
};

const themesMapInverse = new Map();
themesMapInverse.set(ClairityLight, 'light');
themesMapInverse.set(ClairityDark, 'dark');

class SettingsManager {

  constructor() {
    this.initializeSettings();
  }

  initializeSettings() {
    if (!localStorage.getItem('settings')) {
      localStorage.setItem('settings', true);
      this._write(this.defaultSettings);
    }
    this.data = this._read();
    ThemeManager.setTheme(themeMap[this.data.theme]);
  }

  _write(data) {
    localStorage.setItem('settingsData', JSON.serialize(data));
  }

  _read() {
    return JSON.parse(localStorage.getItem('settingsData'));
  }

  get defaultSettings() {
    return {
      compact: false,
      theme: 'light'
    }
  }

  get theme() {
    return themesMap[this.data.theme];
  }

  set theme(newTheme) {
    if (_.isString(newTheme)) {
      if (themesMap[newTheme]) {
        this.data.theme = newTheme;
        ThemeManager.setTheme(themeMap[this.data.theme]);
        this._write(this.data);
        return;
      }
    } else if (_.isObject(newTheme)) {
      if (themesMapInverse.has(newTheme)) {
        this.data.theme = themesMapInverse.get(newTheme);
        ThemeManager.setTheme(themeMap[this.data.theme]);
        this._write(this.data);
        return;
      }
    }
    throw new TypeError('Tried to set SettingsManager.theme to an unknown theme');
  }

  get compact() {
    return this.data.compact;
  }

  set compact(val) {
    this.data.compact = val;
    this._write(val);
  }

}

const singleton = new SettingsManager();

export default singleton;
