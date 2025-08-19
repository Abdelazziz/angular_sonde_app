import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import * as PatientsFilterActions from './filter.patient.data.actions';
import { DoctorService } from '../../../doctor/services/doctor.service';

export const loadFilterPatients$ = createEffect(
  (actions$ = inject(Actions), doctorService = inject(DoctorService)) => {
    return actions$.pipe(
      ofType(PatientsFilterActions.loadDoctors),
      mergeMap(() =>
        doctorService.getDoctors().pipe(
          map((doctors) =>
            PatientsFilterActions.loadDoctorsSuccess({
              doctors: doctors,
            })
          ),
          catchError((error) =>
            of(
              PatientsFilterActions.loadDoctorsFailure({
                error: error.message,
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);
