import { EnvironmentConfiguration } from '@brewdude/brewdude-io/shared/types';
import { createAction, props } from '@ngrx/store';

/**
 * Dark mode actions
 */
export const toggleDarkMode = createAction('[Settings/Dark mode] Toggle');
export const setDarkModeFromLocalStorage = createAction(
  '[Settings/Dark mode] Set from local storage'
);
export const setDarkMode = createAction(
  '[Settings/Dark mode] Set',
  props<{ darkModeEnabled: boolean }>()
);

/**
 * Configuration actions
 */
export const loadEnvironment = createAction('[Settings/Environment] Load');
export const loadEnvironmentSuccess = createAction(
  '[Settings/Environment] Load success',
  props<{ environment: EnvironmentConfiguration }>()
);
