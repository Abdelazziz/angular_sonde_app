import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.reducer';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectAuthLoading = createSelector(
  selectLoginState,
  (state) => state.loading
);

export const selectAuthSuccess = createSelector(
  selectLoginState,
  (state) => state.authResponse
);

export const selectAuthError = createSelector(
  selectLoginState,
  (state) => state.error
);
