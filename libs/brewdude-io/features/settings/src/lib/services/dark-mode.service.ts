import { Injectable } from '@angular/core';

const DARK_MODE_ENABLED_KEY = 'darkModeEnabled';
const ENABLED_VALUE = 'true';
const NOT_ENABLED_VALUE = 'false';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  toggleDarkMode(darkModeEnabled: boolean): void {
    const classList = this.getHtmlClassList();

    if (darkModeEnabled) {
      localStorage.setItem(DARK_MODE_ENABLED_KEY, ENABLED_VALUE);
      classList?.add('dark');
    } else {
      localStorage.setItem(DARK_MODE_ENABLED_KEY, NOT_ENABLED_VALUE);
      classList?.remove('dark');
    }
  }

  setThemeFromLocalStorage(): boolean {
    const currentValue = localStorage.getItem(DARK_MODE_ENABLED_KEY);
    const htmlTag = document.getElementsByTagName('html').item(0);
    const classList = htmlTag?.classList;
    const enabled = currentValue === ENABLED_VALUE;

    if (enabled) {
      classList?.add('dark');
    } else {
      classList?.remove('dark');
    }

    return enabled;
  }

  private getHtmlClassList(): DOMTokenList {
    const htmlTag = document.getElementsByTagName('html').item(0);
    return htmlTag?.classList ?? new DOMTokenList();
  }
}
