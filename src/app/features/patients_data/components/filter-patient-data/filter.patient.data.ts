import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DoctorResponse } from '../../../doctor/models/doctor.response';
import { MatCard } from '@angular/material/card';
import { FilterRequest } from '../../models/filter.request';
import { Store } from '@ngrx/store';
import * as filterPatients from '../../state/filter-patient-data/filter.patient.data.actions';
import {
  selectAllDoctors,
  selectDoctorsError,
  selectDoctorsLoading,
} from '../../state/filter-patient-data/filter.patient.data.selector';
import * as PatientsDataActions from '../../state/patients-data/patients.data.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-patient-data',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCard,
  ],
  templateUrl: './filter.patient.data.html',
  styleUrl: './filter.patient.data.scss',
})
export class FilterPatientData implements OnInit {
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);
  private activatedRoute = inject(ActivatedRoute);

  doctors: DoctorResponse[] = [];

  filterForm = this.formBuilder.group({
    name: [''],
    sex: [''],
    doctor: [''],
    startDate: [null],
    endDate: [null],
  });

  isLoading = signal(false);
  errorMessage = signal('');

  ngOnInit(): void {
    this.fetechData();

    this.store
      .select(selectAllDoctors)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((doctors) => {
        this.doctors = doctors;
      });

    this.store
      .select(selectDoctorsLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loading) => {
        this.isLoading.set(loading);
      });

    this.store
      .select(selectDoctorsError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((error) => {
        if (error) {
          this.errorMessage.set(error);
        } else {
          this.errorMessage.set('');
        }
      });
  }

  fetechData() {
    this.store.dispatch(filterPatients.loadDoctors());
  }

  setSexFilter(sex: string) {
    const current = this.filterForm.get('sex')?.value;
    this.filterForm.patchValue({ sex: current === sex ? '' : sex });
  }

  emitFilters() {
    const name = this.filterForm.controls.name.value?.trim();
    const sex = this.filterForm.controls.sex.value;
    const fromDate = this.filterForm.controls.startDate.value
      ? new Date(this.filterForm.controls.startDate.value)
      : null;
    const toDate = this.filterForm.controls.endDate.value
      ? new Date(this.filterForm.controls.endDate.value)
      : null;
    const userNameDoctor = this.filterForm.controls.doctor.value;
    const filterRequest = new FilterRequest(
      name,
      sex,
      userNameDoctor,
      fromDate,
      toDate
    );

    let isHistory: boolean =
      this.activatedRoute.snapshot.data['isHistory'] || false;

    this.store.dispatch(
      PatientsDataActions.loadPatientsData({
        page: 0,
        size: 25,
        filterRequest: filterRequest,
        isHistory: isHistory,
      })
    );
  }

  resetFilters() {
    this.filterForm.reset();
    this.emitFilters();
  }

  onSubmit() {
    this.emitFilters();
  }
}
