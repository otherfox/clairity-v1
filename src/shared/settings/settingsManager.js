import {ThemeManager, ClairityLight, ClairityDark} from '../themes'
import _ from 'lodash'
import { mapify } from 'es6-mapify'

const themesMap = {
  light: ClairityLight,
  dark: ClairityDark
};

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
      this.data;
    }
  }

  get compact() {
    return true;
  }

}

const singleton = new SettingsManager();

export default singleton;
