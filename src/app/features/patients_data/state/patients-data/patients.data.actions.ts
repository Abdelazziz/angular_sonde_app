import { createAction, props } from '@ngrx/store';
import { FilterRequest } from '../../models/filter.request';
import { PatientDataResponse } from '../../models/patient.data.response';

export const loadPatientsData = createAction(
  '[Patients] Load Patients Data',
  props<{
    page: number;
    size: number;
    filterRequest?: FilterRequest;
    isHistory: boolean;
  }>()
);

export const loadPatientsDataSuccess = createAction(
  '[Patients] Load Patients Data Success',
  props<{ patientsData: PatientDataResponse[] }>()
);

export const loadPatientsFailure = createAction(
  '[Patients] Load Patients Data Failure',
  props<{ error: string }>()
);
