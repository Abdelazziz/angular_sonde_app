import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { DoctorService } from '../services/doctor.service';
import { DoctorResponse } from '../models/doctor.response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private doctorService = inject(DoctorService);
  private destroyRef = inject(DestroyRef);

  displayedColumns: string[] = ['index', 'name', 'role'];

  dataSource: DoctorResponse[] = [];

  isLoading = signal(false);
  errorMessage = signal('');

  ngOnInit() {
    this.fetechData();
  }

  fetechData() {
    this.isLoading.set(true);
    this.doctorService
      .getDoctors()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.dataSource = res.map((item, i) => ({
            ...item,
            index: i + 1,
          }));

          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error('fetch data failed', err);
          this.errorMessage.set(err as string);
        },
      });
  }
}
