import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../_validators/custom.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<void>();

  model: any = {};
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, CustomValidators.fieldMatchValidator('password')]]
      // }, CustomValidators.passwordMatchValidator);
    });
  }

  register() {
    // this.authService.register(this.model).subscribe(
    //   () => {
    //     this.alertify.success('Registration successful');
    //   },
    //   error => {
    //     this.alertify.error(error);
    //   }
    // );
    console.log(this.registerForm);
    console.log('valid', this.registerForm.valid);
  }

  cancel() {
    this.cancelRegister.emit();
  }

  get usernameField(): AbstractControl {
    return this.registerForm.get('username');
  }

  get passwordField(): AbstractControl {
    return this.registerForm.get('password');
  }

  get confirmPasswordField(): AbstractControl {
    return this.registerForm.get('confirmPassword');
  }

}
