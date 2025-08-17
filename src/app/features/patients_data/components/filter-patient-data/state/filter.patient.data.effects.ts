import { inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { DoctorService } from '../../../../doctor/services/doctor.service';
import * as PatientsFilterActions from './filter.patient.data.actions';

export const loadFilterPatients$ = createEffect(
  (
    actions$ = inject(Actions),
    doctorService = inject(DoctorService),
    destroyRef = inject(DestroyRef)
  ) => {
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
