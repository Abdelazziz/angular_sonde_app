import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppConfig } from '../../../utils/app.config';
import { TokenStorageService } from './token.storage.service';
import { HttpService } from '../../../core/service/http.service';
import { AuthRequest } from '../models/auth.request';
import { AuthResponse } from '../models/auth.response';
import { AuthRefreshTokenRequest } from '../models/auth.refreshtoken.request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpService = inject(HttpService);
  private tokenStorage = inject(TokenStorageService);

  private readonly authUrl = `${AppConfig.API_BASE_URL}/auth/login`;
  private readonly refreshUrl = `${AppConfig.API_BASE_URL}/auth/refresh`;

  login(userName: string, password: string): Observable<AuthResponse> {
    const request = new AuthRequest(userName, password);

    return this.httpService
      .post<AuthResponse>(
        this.authUrl,
        request.toJson(),
        AuthResponse.fromJson,
        {
          'Content-Type': 'application/json',
        }
      )
      .pipe(
        tap((res: AuthResponse) => {
          this.tokenStorage.saveTokens(res.accessToken, res.refreshToken);
        })
      );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.tokenStorage.getRefreshToken();
    const authRefreshTokenRequest = new AuthRefreshTokenRequest(refreshToken!);

    return this.httpService
      .post<AuthResponse>(
        this.refreshUrl,
        authRefreshTokenRequest.toJson(),
        AuthResponse.fromJson,
        {
          'Content-Type': 'application/json',
        }
      )
      .pipe(
        tap((res: AuthResponse) => {
          this.tokenStorage.clear();
          this.tokenStorage.saveTokens(res.accessToken, res.refreshToken);
        }),
        catchError((err) => {
          this.logout();
          throw err;
        })
      );
  }

  logout(): void {
    this.tokenStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.tokenStorage.getAccessToken();
  }
}
