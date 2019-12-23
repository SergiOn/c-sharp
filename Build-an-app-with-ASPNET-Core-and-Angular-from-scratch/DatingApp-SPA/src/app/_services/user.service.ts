import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable()
export class UserService {

  private readonly url = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.url}/${id}`, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(`${this.url}/${userId}/photos/${id}/setMain`, {});
  }

}
