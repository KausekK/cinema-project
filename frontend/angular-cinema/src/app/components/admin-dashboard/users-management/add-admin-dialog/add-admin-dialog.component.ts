import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { merge } from 'rxjs';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-add-admin-dialog',
  templateUrl: './add-admin-dialog.component.html',
  styleUrl: './add-admin-dialog.component.css'
})
export class AddAdminDialogComponent {

  filteredEmails: string[] = [];
  selectedEmail: string = '';
  selectedId: string = '';

  constructor(public dialogRef: MatDialogRef<AddAdminDialogComponent>,
    private userService: UserService
  ) {
   
  }

  selectEmail(id: string, email: string) {
    this.selectedEmail= email;
    this.selectedId = id;
    this.filteredEmails = [];
    console.log(this.selectedEmail, this.selectedId)
  }

  filterEmails() {
    if (this.selectedEmail.length === 0) {
      this.filteredEmails = [];
    } else if(this.selectedEmail.length > 1){
      this.userService.getDynamicAdminsFilter(this.selectedEmail).subscribe((emails: string[]) => {
        this.filteredEmails = emails;
        console.log(this.filteredEmails)
      });
    }
  }
  

  confirm() {
    this.dialogRef.close(this.selectedId);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  
}


