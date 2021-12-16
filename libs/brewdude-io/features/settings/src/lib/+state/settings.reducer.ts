import { createReducer, on } from '@ngrx/store';
import { EnvironmentConfiguration } from '@brewdude/brewdude-io/shared/types';
import * as fromActions from './settings.actions';

export const settingsFeatureKey = 'settings';

export interface SettingsState {
  darkModeEnabled: boolean;
  environment?: EnvironmentConfiguration;
}

const initialState: SettingsState = {
  darkModeEnabled: false,
};

export const settingsReducer = createReducer(
  initialState,
  on(fromActions.loadEnvironmentSuccess, (state, { environment }) => ({
    ...state,
    ...environment,
  })),
  on(fromActions.toggleDarkMode, (state) => ({
    ...state,
    darkModeEnabled: !state.darkModeEnabled,
  })),
  on(fromActions.setDarkMode, (state, { darkModeEnabled }) => ({
    ...state,
    darkModeEnabled,
  }))
);
