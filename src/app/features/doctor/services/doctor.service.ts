import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../../core/service/http.service';
import { AppConfig } from '../../../utils/app.config';
import { DoctorResponse } from '../models/doctor.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private httpService = inject(HttpService);

  private readonly endPointDoctors = `${AppConfig.API_BASE_URL}/doctors`;

  getDoctors(): Observable<DoctorResponse[]> {
    return this.httpService.getList(
      this.endPointDoctors,
      DoctorResponse.fromJson
    );
  }
}
