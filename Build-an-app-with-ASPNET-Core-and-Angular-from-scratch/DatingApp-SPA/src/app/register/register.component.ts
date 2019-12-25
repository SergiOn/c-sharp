import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { CustomValidators } from '../_validators/custom.validators';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<void>();

  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      gender: ['', Validators.required],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, CustomValidators.fieldMatchValidator('password')]]
      // }, {validators: CustomValidators.passwordMatchValidator)};
    });
    this.bsConfig = {
      containerClass: 'theme-red'
    };
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const user: User = this.registerForm.value;
    this.authService.register(user).subscribe(
      () => {
        this.alertify.success('Registration successful');
      },
      error => {
        this.alertify.error(error);
      },
      () => {
        this.authService.login(user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      }
    );
  }

  cancel() {
    this.cancelRegister.emit();
  }

  get genderField(): AbstractControl {
    return this.registerForm.get('gender');
  }

  get usernameField(): AbstractControl {
    return this.registerForm.get('username');
  }

  get knownAsField(): AbstractControl {
    return this.registerForm.get('knownAs');
  }

  get dateOfBirthField(): AbstractControl {
    return this.registerForm.get('dateOfBirth');
  }

  get cityField(): AbstractControl {
    return this.registerForm.get('city');
  }

  get countryField(): AbstractControl {
    return this.registerForm.get('country');
  }

  get passwordField(): AbstractControl {
    return this.registerForm.get('password');
  }

  get confirmPasswordField(): AbstractControl {
    return this.registerForm.get('confirmPassword');
  }

}
