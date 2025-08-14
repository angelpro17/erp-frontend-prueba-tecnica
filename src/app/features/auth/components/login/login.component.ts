import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../../../core/services/auth.service';
import type { LoginRequest } from '../../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected loginForm: FormGroup = this.fb.group({
    identifier: ['', [Validators.required]], // correo o nombre
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected hidePassword = true;
  protected isLoading = false;

  protected onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) return;
    this.isLoading = true;

    const payload: LoginRequest = this.loginForm.value;
    this.authService.login(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('¡Bienvenido al Sistema ERP!', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
        const redirectTo = (new URLSearchParams(location.search)).get('redirectTo') || '/dashboard';
        this.router.navigateByUrl(redirectTo);
      },
      error: (error) => {
        this.isLoading = false;
        const msg = error?.status === 401 ? 'Credenciales inválidas'
          : (error?.status === 0 ? 'Error de conexión con el servidor'
            : (error?.message || 'Error en el servidor'));
        this.snackBar.open(msg, 'Cerrar', { duration: 5000, panelClass: ['error-snackbar'] });
      }
    });
  }
}
