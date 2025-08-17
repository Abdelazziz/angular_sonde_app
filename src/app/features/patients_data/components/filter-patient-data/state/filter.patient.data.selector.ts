import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DoctorState } from './filter.patient.data.reducer';

export const selectDoctorState = createFeatureSelector<DoctorState>(
  'filterDataPatientReducer'
);

export const selectAllDoctors = createSelector(
  selectDoctorState,
  (state) => state.doctors
);

export const selectDoctorsLoading = createSelector(
  selectDoctorState,
  (state) => state.loading
);

export const selectDoctorsError = createSelector(
  selectDoctorState,
  (state) => state.error
);
