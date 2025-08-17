import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PatientDataResponse } from '../../models/patient.data.response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FilterPatientData } from '../filter-patient-data/filter.patient.data';
import { FilterRequest } from '../../models/filter.request';
import { ActivatedRoute } from '@angular/router';
import * as PatientsDataActions from './state/patients.data.actions';
import { Store } from '@ngrx/store';
import {
  selectAllPatients,
  selectPatientsLoading,
  selectPatientsError,
} from './state/patients.data.selector';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-patient.data',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FilterPatientData,
    MatInputModule,
  ],
  templateUrl: './patient.data.html',
  styleUrl: './patient.data.scss',
})
export class PatientData implements OnInit {
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);

  private store = inject(Store);

  displayedColumns: string[] = [
    'index',
    'name',
    'phone',
    'address',
    'startdate',
    'enddate',
    'doctorName',
  ];

  isHistory = false;

  title = '';

  dataSource: PatientDataResponse[] = [];

  pageSize = 25;
  currentPage = 0;
  totalElements = -1;

  isLoading = signal(false);
  errorMessage = signal('');

  filterRequest = new FilterRequest('', null, null, null);

  ngOnInit() {
    this.isHistory = this.activatedRoute.snapshot.data['isHistory'] || false;
    this.title = this.isHistory
      ? 'Historique des patients'
      : 'Liste des patients';
    this.loadPage(0, this.pageSize);

    this.store
      .select(selectAllPatients)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data.length > 0) {
          this.totalElements = data[0].totalElments;

          const startIndex = this.currentPage * this.pageSize;
          this.dataSource = data.map((item, i) => ({
            ...item,
            index: startIndex + i + 1,
          }));
        } else {
          this.dataSource = [];
          this.currentPage = 0;
          this.totalElements = 0;
        }
      });

    this.store
      .select(selectPatientsLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loading) => {
        this.isLoading.set(loading);
      });

    this.store
      .select(selectPatientsError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((error) => {
        if (error) {
          this.errorMessage.set(
            'Error please try again later or contact support'
          );
          this.dataSource = [];
        } else {
          this.errorMessage.set('');
        }
      });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadPage(this.currentPage, this.pageSize, false);
  }

  loadPage(page: number, size: number, isInitial: boolean = true) {
    isInitial
      ? this.store.dispatch(
          PatientsDataActions.loadPatientsData({
            page: page,
            size: size,
            filterRequest: this.filterRequest,
            isHistory: this.isHistory,
          })
        )
      : this.store.dispatch(
          PatientsDataActions.loadPatientsData({
            page: page,
            size: size,
            isHistory: this.isHistory,
          })
        );
  }
}
