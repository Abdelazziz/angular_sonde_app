import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { trimRequired } from '../../../utils/app.utilities';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  loginForm = this.formBuilder.group({
    id: this.formBuilder.control<string>('', {
      nonNullable: true,
      validators: [trimRequired()],
    }),
    password: this.formBuilder.control<string>('', {
      nonNullable: true,
      validators: [trimRequired()],
    }),
  });

  hidePassword = signal(true);
  errorMessage = signal('');
  loading = signal(false);

  erroEmptyID = 'Identifiant obligatoire';
  erroEmptyPassword = 'Le mot de passe est obligatoire';

  togglePasswordVisibility() {
    this.hidePassword.update((v) => !v);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const useName: string = this.loginForm.controls.id.value.trim();
    const password: string = this.loginForm.controls.password.value.trim();

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService
      .login(useName, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading.set(false);
          console.error('Login failed', err);

          if (err.status === 401) {
            this.errorMessage.set('Invalid credentials.');
          } else {
            this.errorMessage.set('Login failed. Please try again.');
          }
        },
      });
  }
}
