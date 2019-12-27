import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  private readonly url = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page?: number, itemsPerPage?: number): Observable<PaginatedResult<User[]>> {
    let params = new HttpParams();

    if (page) {
      params = params.append('pageNumber', page.toString());
    }
    if (itemsPerPage) {
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<User[]>(this.url, { observe: 'response', params }).pipe(
      map((response: HttpResponse<User[]>) => new PaginatedResult<User[]>(response.body, JSON.parse(response.headers.get('Pagination'))))
    );
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

  deletePhoto(userId: number, id: number) {
    return this.http.delete(`${this.url}/${userId}/photos/${id}`);
  }

}
