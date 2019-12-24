import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../_validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<void>();

  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('1', Validators.required),
      password: new FormControl('2', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('3', [Validators.required, CustomValidators.fieldMatchValidator('password')]),
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
  }

  cancel() {
    this.cancelRegister.emit();
  }

}
