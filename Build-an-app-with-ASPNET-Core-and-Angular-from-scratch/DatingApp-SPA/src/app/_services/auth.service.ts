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
    this.currentUser.photoUrl = photoUrl;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

  login(model: any) {
    return this.http.post(`${this.baseUrl}/login`, model).pipe(
      map((response: any) => {
        if (response) {
          const { token, user } = response;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.decodedToken = this.jwtHelperService.decodeToken(token);
          this.currentUser = user;
          this.changeMemberPhoto(user.photoUrl);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(`${this.baseUrl}/register`, user);
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
