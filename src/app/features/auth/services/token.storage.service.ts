import { Injectable } from '@angular/core';
import { AppConfig } from '../../../utils/app.config';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  saveTokens(accessToken: string, refreshToken: string): void {
    sessionStorage.setItem(AppConfig.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(AppConfig.ACCESS_TOKEN_KEY, accessToken);

    localStorage.setItem(AppConfig.REFRESH_TOKEN_KEY, refreshToken);
  }

  getAccessToken(): string | null {
    // return sessionStorage.getItem(AppConfig.ACCESS_TOKEN_KEY);
    return localStorage.getItem(AppConfig.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(AppConfig.REFRESH_TOKEN_KEY);
  }

  clear(): void {
    sessionStorage.removeItem(AppConfig.ACCESS_TOKEN_KEY);

    localStorage.removeItem(AppConfig.ACCESS_TOKEN_KEY);
    localStorage.removeItem(AppConfig.REFRESH_TOKEN_KEY);
  }
}
