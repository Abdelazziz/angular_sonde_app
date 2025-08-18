import { createAction, props } from '@ngrx/store';
import { DoctorResponse } from '../../../doctor/models/doctor.response';

export const loadDoctors = createAction('[Doctors] Load Doctors Data');

export const loadDoctorsSuccess = createAction(
  '[Doctors] Load Doctors Data Success',
  props<{ doctors: DoctorResponse[] }>()
);

export const loadDoctorsFailure = createAction(
  '[Doctors] Load Doctors Data Failure',
  props<{ error: string }>()
);
