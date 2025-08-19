import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as DoctorsActions from './doctors.actions';
import { mergeMap, map, catchError, of } from 'rxjs';
import { DoctorService } from '../services/doctor.service';

export const loadDoctors$ = createEffect(
  (actions$ = inject(Actions), doctorService = inject(DoctorService)) => {
    return actions$.pipe(
      ofType(DoctorsActions.loadDoctors),
      mergeMap(() => {
        return doctorService.getDoctors().pipe(
          map((doctors) =>
            DoctorsActions.loadDoctorsSuccess({
              doctors: doctors,
            })
          ),
          catchError((error) =>
            of(
              DoctorsActions.loadDoctorsFailure({
                error: error.message,
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);
