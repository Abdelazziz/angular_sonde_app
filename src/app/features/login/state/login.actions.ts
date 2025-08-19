import { createAction, props } from '@ngrx/store';
import { AuthResponse } from '../../auth/models/auth.response';

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Login API] Login Success',
  props<{ loginResponse: AuthResponse }>()
);

export const loginFailure = createAction(
  '[Login API] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Logout] Logout');
