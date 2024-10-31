import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CinemaValidators } from '../../validators/cinema-validators';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      register: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(2), CinemaValidators.notOnlyWhitespace]],
        lastName: ['', [Validators.required, Validators.minLength(2), CinemaValidators.notOnlyWhitespace]],
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required, Validators.minLength(6), CinemaValidators.notOnlyWhitespace]]
      })
    });
  }
  

  onSubmit(): void {
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
      return;
    }
  
    const registerData = this.registerFormGroup.get('register')?.value;
  
    this.authService.register(registerData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.showSnackbar('Użytkownik wylogowany');
      },
      error: (error) => {
        console.error('Błąd podczas rejestracji', error);
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

  get firstName(){
    return this.registerFormGroup.get('register.firstName');
  }
  get lastName(){
    return this.registerFormGroup.get('register.lastName');
  }
 
  get email(){
    return this.registerFormGroup.get('register.email');
  }
  get password(){
    return this.registerFormGroup.get('register.password');
  }

}
