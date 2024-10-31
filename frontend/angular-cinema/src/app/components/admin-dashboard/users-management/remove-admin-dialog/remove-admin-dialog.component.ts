import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-admin-change-dialog',
  templateUrl: './remove-admin-dialog.component.html',
  styleUrl: './remove-admin-dialog.component.css'
})
export class RemoveAdminDialogComponent {


  constructor(public dialogRef: MatDialogRef<RemoveAdminDialogComponent>) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
