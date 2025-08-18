import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { appInterceptor } from './core/interceptor/app-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { patientsReducer } from './features/patients_data/state/patients-data/patients.data.reducer';
import { filterPatientsReducer } from './features/patients_data/state/filter-patient-data/filter.patient.data.reducer';
import * as PatientsDataEffects from './features/patients_data/state/patients-data/patients.data.effects';
import * as PatientsFilterDataEffects from './features/patients_data/state/filter-patient-data/filter.patient.data.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([appInterceptor])),
    provideStore({
      patientsData: patientsReducer,
      filterDataPatientReducer: filterPatientsReducer,
    }),
    provideEffects(PatientsDataEffects, PatientsFilterDataEffects),
  ],
};
