import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { trimRequired } from '../../../utils/app.utilities';
import { Store } from '@ngrx/store';
import * as loginActions from '../state/login.actions';
import {
  selectAuthLoading,
  selectAuthSuccess,
  selectAuthError,
} from '../state/login.selector';

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
export class Login implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store);

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

  ngOnInit(): void {
    this.store.select(selectAuthLoading).subscribe((loading) => {
      this.loading.set(loading);
    });

    this.store.select(selectAuthSuccess).subscribe((response) => {
      if (response) {
        this.router.navigate(['/home']);
      }
    });

    this.store.select(selectAuthError).subscribe((error) => {
      if (error) {
        this.errorMessage.set(error);
      }
    });
  }

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

    this.store.dispatch(
      loginActions.login({ username: useName, password: password })
    );
  }
}
