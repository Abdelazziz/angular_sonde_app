import { createReducer, on } from '@ngrx/store';
import * as loginActions from './login.actions';
import { AuthResponse } from '../../auth/models/auth.response';

export interface LoginState {
  authResponse: AuthResponse | null;
  loading: boolean;
  error: string | null;
}

export const initialLoginState: LoginState = {
  authResponse: null,
  loading: false,
  error: null,
};

export const loginReducer = createReducer(
  initialLoginState,
  on(loginActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginActions.loginSuccess, (state, { loginResponse }) => ({
    ...state,
    authResponse: loginResponse,
    loading: false,
    error: null,
  })),
  on(loginActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
