import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  styleUrl: './profile-page.component.scss',
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(AuthService);

  readonly form = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  saved = false;

  constructor() {
    const profile = this.auth.getProfile();
    this.form.setValue({
      username: profile.username,
      email: profile.email,
      password: profile.password,
    });
  }

  submit(): void {
    this.saved = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.updateProfile(this.form.getRawValue());
    this.saved = true;
  }
}
