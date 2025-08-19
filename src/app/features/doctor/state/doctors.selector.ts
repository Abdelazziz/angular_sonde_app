import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DoctorsState } from './doctors.reducer';

export const selectDoctorsState =
  createFeatureSelector<DoctorsState>('doctors');

export const selectAllDoctors = createSelector(
  selectDoctorsState,
  (state) => state.doctors
);

export const selectDoctorLoading = createSelector(
  selectDoctorsState,
  (state) => state.loading
);

export const selectDoctorError = createSelector(
  selectDoctorsState,
  (state) => state.error
);
