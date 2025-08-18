import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PatientsActions from './patients.data.actions';
import { mergeMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { selectFilterRequest } from './patients.data.selector';
import { Store } from '@ngrx/store';
import { PatientDataService } from '../../services/patient-data.service';

export const loadPatients$ = createEffect(
  (
    actions$ = inject(Actions),
    patientsService = inject(PatientDataService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(PatientsActions.loadPatientsData),
      withLatestFrom(store.select(selectFilterRequest)),
      mergeMap(([action, lastFilterRequest]) => {
        const filter = action.filterRequest ?? lastFilterRequest;

        return patientsService
          .getPatientsData(action.page, action.size, filter!, action.isHistory)
          .pipe(
            map((patients) =>
              PatientsActions.loadPatientsDataSuccess({
                patientsData: patients,
              })
            ),
            catchError((error) =>
              of(
                PatientsActions.loadPatientsFailure({
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
