import { createReducer, on } from '@ngrx/store';
import * as PatientsFilterActions from './filter.patient.data.actions';
import { DoctorResponse } from '../../../doctor/models/doctor.response';

export interface DoctorState {
  doctors: DoctorResponse[];
  loading: boolean;
  error: string | null;
}

export const initialState: DoctorState = {
  doctors: [],
  loading: false,
  error: null,
};

export const filterPatientsReducer = createReducer(
  initialState,
  on(PatientsFilterActions.loadDoctors, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PatientsFilterActions.loadDoctorsSuccess, (state, { doctors }) => ({
    ...state,
    doctors,
    loading: false,
    error: null,
  })),
  on(PatientsFilterActions.loadDoctorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
