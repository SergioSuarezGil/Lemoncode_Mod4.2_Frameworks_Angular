import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  styleUrl: './login-page.component.scss',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  invalidCredentials = false;
  isLoading = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  submit(): void {
    if (this.isLoading) {
      return;
    }

    this.invalidCredentials = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.auth
      .login(this.form.getRawValue())
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((success) => {
        if (!success) {
          this.invalidCredentials = true;
          return;
        }

        void this.router.navigate(['/dashboard']);
      });
  }
}
