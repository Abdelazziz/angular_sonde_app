import { createAction, props } from '@ngrx/store';
import { DoctorResponse } from '../models/doctor.response';

export const loadDoctors = createAction('[Doctors] Load Doctors');

export const loadDoctorsSuccess = createAction(
  '[Doctors] Load Patients Data Success',
  props<{ doctors: DoctorResponse[] }>()
);

export const loadDoctorsFailure = createAction(
  '[Doctors] Load Doctors Failure',
  props<{ error: string }>()
);
