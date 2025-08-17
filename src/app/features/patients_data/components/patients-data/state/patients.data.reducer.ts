import { createReducer, on } from '@ngrx/store';
import * as PatientsActions from './patients.data.actions';
import { PatientDataResponse } from '../../../models/patient.data.response';
import { FilterRequest } from '../../../models/filter.request';

export interface PatientsDataState {
  patientsData: PatientDataResponse[];
  loading: boolean;
  error: string | null;
  filterRequest: FilterRequest | null;
}

export const initialState: PatientsDataState = {
  patientsData: [],
  loading: false,
  error: null,
  filterRequest: null,
};

export const patientsReducer = createReducer(
  initialState,
  on(PatientsActions.loadPatientsData, (state, { filterRequest }) => ({
    ...state,
    loading: true,
    error: null,
    filterRequest: filterRequest ?? state.filterRequest,
  })),
  on(PatientsActions.loadPatientsDataSuccess, (state, { patientsData }) => ({
    ...state,
    patientsData,
    loading: false,
    error: null,
  })),
  on(PatientsActions.loadPatientsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
