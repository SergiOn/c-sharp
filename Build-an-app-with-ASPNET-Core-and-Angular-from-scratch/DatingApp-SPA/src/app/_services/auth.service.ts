import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  decodedToken: any;
  currentUser: User;
  photoUrl: string;

  private readonly baseUrl = '/api/auth';

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
    this.decodedToken = jwtHelperService.decodeToken();
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.photoUrl = this.currentUser ? this.currentUser.photoUrl : '/assets/user.png';
  }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl = photoUrl;
  }

  login(model: any) {
    return this.http.post(`${this.baseUrl}/login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelperService.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(`${this.baseUrl}/register`, model);
  }

  loggedIn() {
    return !this.jwtHelperService.isTokenExpired();
  }

  logout() {
    localStorage.removeItem('token');
    this.decodedToken = null;
    localStorage.removeItem('user');
    this.currentUser = null;
  }

}
