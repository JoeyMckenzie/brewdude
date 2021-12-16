import { createFeatureSelector, createSelector } from '@ngrx/store';
import { settingsFeatureKey, SettingsState } from './settings.reducer';

const settingsFeatureSelector =
  createFeatureSelector<SettingsState>(settingsFeatureKey);

export const selectDarkModeEnabled = createSelector(
  settingsFeatureSelector,
  (state) => state.darkModeEnabled
);

export const selectEnvironment = createSelector(
  settingsFeatureSelector,
  (state) => state.environment
);
