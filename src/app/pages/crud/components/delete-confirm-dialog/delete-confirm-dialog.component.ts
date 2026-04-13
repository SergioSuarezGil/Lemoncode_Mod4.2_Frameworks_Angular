import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface DeleteConfirmDialogData {
  userLabel: string;
}

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  styleUrl: './delete-confirm-dialog.component.scss',
  templateUrl: './delete-confirm-dialog.component.html'
})
export class DeleteConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<DeleteConfirmDialogComponent, boolean>);
  readonly data = inject<DeleteConfirmDialogData>(MAT_DIALOG_DATA);

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
