import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        console.log('registration successful');
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
