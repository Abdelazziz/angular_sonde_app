import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../../core/service/http.service';
import { AppConfig } from '../../../utils/app.config';
import { PatientDataResponse } from '../models/patient.data.response';
import { Observable, of } from 'rxjs';
import { FilterRequest } from '../models/filter.request';

@Injectable({
  providedIn: 'root',
})
export class PatientDataService {
  private httpService = inject(HttpService);

  private readonly endPointDataPatientWithFilter = `${AppConfig.API_BASE_URL}/medical-data-patient/filter`;
  private readonly endPointDataPatientHistory = `${AppConfig.API_BASE_URL}/medical-data-patient/history`;

  getPatientsData(
    page: number,
    size: number,
    filterRequest: FilterRequest,
    isHistory: boolean
  ): Observable<PatientDataResponse[]> {
    return isHistory
      ? this.httpService.postList(
          `${this.endPointDataPatientHistory}?page=${page}&size=${size}`,
          filterRequest.toJson(),
          PatientDataResponse.fromJson
        )
      : this.httpService.postList(
          `${this.endPointDataPatientWithFilter}?page=${page}&size=${size}`,
          filterRequest.toJson(),
          PatientDataResponse.fromJson
        );
  }
}
