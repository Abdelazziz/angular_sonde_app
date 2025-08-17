import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '../../features/auth/services/token.storage.service';
import { AuthService } from '../../features/auth/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

const excludedPaths = ['/auth/login', '/auth/refresh'];

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenStorageService);
  const accessToken = tokenService.getAccessToken();
  const authService = inject(AuthService);
  const router = inject(Router);

  const isExcludePath = excludedPaths.some((path) =>
    new URL(req.url, location.origin).pathname.startsWith(path)
  );

  if (isExcludePath) {
    return next(req);
  }

  const authReq = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': req.headers.get('Content-Type') || 'application/json',
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If token expired and refresh token exists, try refresh
      if (
        (error.status === 401 || error.status === 403) &&
        !isExcludePath &&
        tokenService.getRefreshToken()
      ) {
        return authService.refreshToken().pipe(
          switchMap((response) => {
            const newAccessToken = response.accessToken;
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`,
                'Content-Type':
                  req.headers.get('Content-Type') || 'application/json',
              },
            });
            return next(retryReq);
          }),
          catchError((err) => {
            // Refresh failed -> logout
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
