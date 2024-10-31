import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../common/admin';
import { MatDialog } from '@angular/material/dialog';
import { RemoveAdminDialogComponent } from './remove-admin-dialog/remove-admin-dialog.component';
import { AddAdminDialogComponent } from './add-admin-dialog/add-admin-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css'
})
export class UsersManagementComponent implements OnInit{

  adminUsers: Admin [] = [];
  receivedId: string | null = null;

  constructor(private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(){
    this.userService.getAdmins().subscribe(
      data =>{
        this.adminUsers = data;
      }
    )
  }

  openRemoveAdminDialog(userId: number) {
    const dialogRef = this.dialog.open(RemoveAdminDialogComponent);
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.userService.updateRole(userId).subscribe({
          next: () => {
            console.log('Rola zmieniona pomyślnie');
            this.showSnackbar('Rola użytkownika została pomyślnie zmieniona.');
            this.getAdmins();
          },
          error: (error) => {
            console.error('Błąd przy zmianie roli:', error);
            this.showSnackbar('Wystąpił błąd przy zmianie roli.');
          }      
          });
      } else {
        console.log('Zmiana roli anulowana');
      }
    });
  }

  openAddAdminDialog(){
    const dialogRef = this.dialog.open(AddAdminDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result)
        if (result) {
          this.userService.updateRole(result).subscribe({
            next: () => {
              console.log('Rola zmieniona pomyślnie');
              this.showSnackbar('Rola użytkownika została pomyślnie zmieniona.');
              this.getAdmins();
            },
            error: (error) => {
              console.error('Błąd przy zmianie roli:', error);
              this.showSnackbar('Wystąpił błąd przy zmianie roli.');
            }             
           });    
          } else {
        console.log('Zmiana roli anulowana');
      }
    }
  });
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Zamknij', {
      duration: 3000, 
      verticalPosition: 'top', 
      horizontalPosition: 'center' 
    });
  }
}
