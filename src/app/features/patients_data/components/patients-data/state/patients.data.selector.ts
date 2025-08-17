import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientsDataState } from './patients.data.reducer';

export const selectPatientsState =
  createFeatureSelector<PatientsDataState>('patientsData');

export const selectAllPatients = createSelector(
  selectPatientsState,
  (state) => state.patientsData
);

export const selectPatientsLoading = createSelector(
  selectPatientsState,
  (state) => state.loading
);

export const selectPatientsError = createSelector(
  selectPatientsState,
  (state) => state.error
);

export const selectFilterRequest = createSelector(
  selectPatientsState,
  (state) => state.filterRequest
);
