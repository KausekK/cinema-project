import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { Admin } from '../../common/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFormGroup!: FormGroup;
  loginError: string = ''; 
  admins: Admin [] = [] 

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar, 
    private userService: UserService

  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      login: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      })
    });
  }

  onSubmit(): void {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }
    
    const loginData = this.loginFormGroup.get('login')?.value;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/main']);
        this.showSnackbar('Użytkownik zalogowany');
      },
      error: (error) => {
        console.error('Błąd podczas logowania', error);
        this.loginError = 'Nieprawidłowy adres e-mail lub hasło.'; 
      }
    });

    this.userService.getAdmins().subscribe(
      data=>{
        this.admins = data;
        console.log(this.admins)
        console.log(loginData)
        const role = this.admins.find(role => role.email.toLowerCase() === loginData.email.toLowerCase());
        console.log(role)
         role ? localStorage.setItem("role","Admin") : localStorage.setItem("role","User");
      }
    )
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Zamknij', {
      duration: 3000, 
      verticalPosition: 'top', 
      horizontalPosition: 'center' 
    });
  }
}
