import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as loginActions from './login.actions';
import { inject } from '@angular/core';
import { mergeMap, map, catchError, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

export const loginAuth$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(loginActions.login),
      mergeMap(({ username, password }) => {
        return authService.login(username, password).pipe(
          map((response) =>
            loginActions.loginSuccess({ loginResponse: response })
          ),
          catchError((err) => {
            let error: string;
            if (err.status === 401) {
              error = 'Invalid credentials.';
            } else {
              error = 'Login failed. Please try again.';
            }
            return of(
              loginActions.loginFailure({ error: error || err.message })
            );
          })
        );
      })
    );
  },
  { functional: true }
);
