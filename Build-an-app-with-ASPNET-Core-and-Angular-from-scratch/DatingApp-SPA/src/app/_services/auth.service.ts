import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  decodedToken: any;
  private readonly baseUrl = '/api/auth';

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
    this.decodedToken = jwtHelperService.decodeToken();
  }

  login(model: any) {
    return this.http.post(`${this.baseUrl}/login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelperService.decodeToken(user.token);
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
  }

}
