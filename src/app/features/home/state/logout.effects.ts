import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth/services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import * as loginActions from '../../../features/login/state/login.actions';
import { tap } from 'rxjs';

export const logoutAuth$ = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(loginActions.logout),
      tap(() => {
        authService.logout();
        router.navigate(['/login']);
      })
    );
  },
  { functional: true, dispatch: false }
);
