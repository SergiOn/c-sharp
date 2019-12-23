import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private authService: AuthService, private alertify: AlertifyService) {}

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('Logged in successfully');
      },
        error => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  getPhotoUrl() {
    return this.authService.photoUrl;
  }

  logout() {
    this.authService.logout();
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

  getDecodedToken() {
    return this.authService.decodedToken;
  }

}
