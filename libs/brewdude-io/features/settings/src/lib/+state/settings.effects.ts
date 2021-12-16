import { Inject, Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { SettingsState } from './settings.reducer';
import { Store } from '@ngrx/store';
import { DarkModeService } from '../services/dark-mode.service';
import * as fromActions from './settings.actions';
import * as fromSelectors from './settings.selectors';
import { ENVIRONMENT } from '@brewdude/brewdude-io/shared/utilities';
import { EnvironmentConfiguration } from '@brewdude/brewdude-io/shared/types';

@Injectable()
export class SettingsEffects {
  toggleDarkMode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.toggleDarkMode),
        concatLatestFrom(() =>
          this.store.select(fromSelectors.selectDarkModeEnabled)
        ),
        tap(([, enabled]) => this.darkModeService.toggleDarkMode(enabled))
      ),
    {
      dispatch: false,
    }
  );

  setThemeFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.setDarkModeFromLocalStorage),
      map(() => {
        const darkModeEnabled = this.darkModeService.setThemeFromLocalStorage();
        return fromActions.setDarkMode({ darkModeEnabled });
      })
    )
  );

  loadEnvironment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadEnvironment),
      map(() =>
        fromActions.loadEnvironmentSuccess({ environment: this.environment })
      )
    )
  );

  constructor(
    @Inject(ENVIRONMENT) private readonly environment: EnvironmentConfiguration,
    private actions$: Actions,
    private store: Store<SettingsState>,
    private darkModeService: DarkModeService
  ) {}
}
