import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CinemaValidators } from '../../validators/cinema-validators';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthenticationService,
    private router: Router  
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
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Błąd podczas rejestracji', error);
      }
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
