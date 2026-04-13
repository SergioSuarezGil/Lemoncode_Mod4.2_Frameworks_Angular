import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserItem, UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users-crud-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    UsersListComponent,
  ],
  styleUrl: './crud-page.component.scss',
  templateUrl: './crud-page.component.html',
})
export class UsersCrudPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private readonly usersService = inject(UsersService);
  @ViewChild(FormGroupDirective) private formDirective?: FormGroupDirective;

  readonly form = this.formBuilder.nonNullable.group({
    id: [1, [Validators.required, Validators.min(1)]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
  });

  readonly users = this.usersService.users;

  editingId: number | null = null;
  formError = '';

  constructor() {
    this.resetForm();
  }

  submit(): void {
    this.formError = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const user: UserItem = {
      id: Number(value.id),
      name: value.name.trim(),
      email: value.email.trim(),
      phone: value.phone.trim(),
    };

    if (this.editingId === null) {
      const createResult = this.usersService.createUser(user);

      if (!createResult.ok) {
        this.formError = 'El ID ya existe.';
        return;
      }

      this.resetForm();
      return;
    }

    const updateResult = this.usersService.updateUser(this.editingId, user);
    if (!updateResult.ok) {
      this.formError = 'El ID ya existe.';
      return;
    }

    this.editingId = null;
    this.resetForm();
  }

  editUser(user: UserItem): void {
    this.formError = '';
    this.editingId = user.id;
    this.form.setValue({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }

  deleteUser(id: number): void {
    const user = this.users().find((item) => item.id === id);
    const userLabel = user ? `${user.name} (ID ${user.id})` : `ID ${id}`;
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { userLabel },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.usersService.deleteUser(id);

      if (this.editingId === id) {
        this.editingId = null;
        this.resetForm();
      }
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.formError = '';
    this.resetForm();
  }

  private resetForm(): void {
    const initialValue = {
      id: this.getNextId(),
      name: '',
      email: '',
      phone: '',
    };

    if (this.formDirective) {
      this.formDirective.resetForm(initialValue);
      return;
    }

    this.form.reset(initialValue);
  }

  private getNextId(): number {
    return this.usersService.getNextId();
  }
}
