import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  model: any = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        console.log('Logged in successfully');
      },
      error => {
        console.log('Failed to login', error);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
