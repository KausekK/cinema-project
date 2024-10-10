import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CinemaValidators } from '../../validators/cinema-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      register: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(2), CinemaValidators.notOnlyWhitespace]],
        lastName: ['', [Validators.required, Validators.minLength(2), CinemaValidators.notOnlyWhitespace]],
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), CinemaValidators.notOnlyWhitespace]],
        password: ['', [Validators.required, Validators.minLength(6), CinemaValidators.notOnlyWhitespace]]
      })
    });
  }
  

  onSubmit() {
    console.log(this.registerFormGroup.get('register')?.value);
    if(this.registerFormGroup.invalid){
      this.registerFormGroup.markAllAsTouched();
    }
  }

  get firstName(){
    return this.registerFormGroup.get('register.firstName');
  }
  get lastName(){
    return this.registerFormGroup.get('register.lastName');
  }
  get phone(){
    return this.registerFormGroup.get('register.phone');
  }
  get email(){
    return this.registerFormGroup.get('register.email');
  }
  get password(){
    return this.registerFormGroup.get('register.password');
  }

}
