import { createReducer, on } from '@ngrx/store';
import * as DoctorsActions from './doctors.actions';
import { DoctorResponse } from '../models/doctor.response';

export interface DoctorsState {
  doctors: DoctorResponse[];
  loading: boolean;
  error: string | null;
}

export const initialState: DoctorsState = {
  doctors: [],
  loading: false,
  error: null,
};

export const doctorReducer = createReducer(
  initialState,
  on(DoctorsActions.loadDoctors, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DoctorsActions.loadDoctorsSuccess, (state, { doctors }) => ({
    ...state,
    doctors,
    loading: false,
    error: null,
  })),
  on(DoctorsActions.loadDoctorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
