import { Routes } from '@angular/router';
import { Login } from './features/login/component/login';
import { Home } from './features/home/component/home';
import { authGuard } from './core/guard/auth-guard';
import { guestGuard } from './core/guard/guest-guard';
import { PatientData } from './features/patients_data/components/patients-data/patient.data';
import { Doctor } from './features/doctor/component/doctor';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
    children: [
      {
        path: 'patient-data',
        component: PatientData,
      },
      {
        path: '',
        redirectTo: 'patient-data',
        pathMatch: 'full',
      },
      {
        path: 'patient-data-history',
        component: PatientData,
        data: { isHistory: true },
      },
      {
        path: 'doctors',
        component: Doctor,
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
