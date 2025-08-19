import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { DoctorService } from '../services/doctor.service';
import { DoctorResponse } from '../models/doctor.response';
import { Store } from '@ngrx/store';
import * as DoctorsActions from '../state/doctors.actions';
import {
  selectAllDoctors,
  selectDoctorLoading,
  selectDoctorError,
} from '../state/doctors.selector';

@Component({
  selector: 'app-doctor',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  templateUrl: './doctor.html',
  styleUrl: './doctor.scss',
})
export class Doctor implements OnInit {
  private store = inject(Store);

  displayedColumns: string[] = ['index', 'name', 'role'];

  dataSource: DoctorResponse[] = [];

  isLoading = signal(false);
  errorMessage = signal('');

  ngOnInit() {
    this.fetechData();

    this.store.select(selectAllDoctors).subscribe((doctors) => {
      this.dataSource = doctors.map((item, i) => ({
        ...item,
        index: i + 1,
      }));

      this.errorMessage.set('');
    });

    this.store.select(selectDoctorLoading).subscribe((loading) => {
      this.isLoading.set(loading);
    });

    this.store.select(selectDoctorError).subscribe((error) => {
      if (error) {
        this.errorMessage.set(error);
      } else {
        this.errorMessage.set('');
      }
    });
  }

  fetechData() {
    this.store.dispatch(DoctorsActions.loadDoctors());
  }
}
