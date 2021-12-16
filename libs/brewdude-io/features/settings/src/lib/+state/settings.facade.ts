import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsState } from './settings.reducer';
import * as fromActions from './settings.actions';
import * as fromSelectors from './settings.selectors';

@Injectable()
export class SettingsFacade {
  darkModeEnabled$ = this.store.select(fromSelectors.selectDarkModeEnabled);
  environment$ = this.store.select(fromSelectors.selectEnvironment);

  constructor(private store: Store<SettingsState>) {}

  toggleDarkMode(): void {
    this.store.dispatch(fromActions.toggleDarkMode());
  }

  setDarkMode(): void {
    this.store.dispatch(fromActions.setDarkModeFromLocalStorage());
  }

  loadEnvironment(): void {
    this.store.dispatch(fromActions.loadEnvironment());
  }
}
