import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';

@Injectable()
export class UserService {

  private readonly url = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1, itemsPerPage: number = 10, userParams: any = {}, likesParam?: string): Observable<PaginatedResult<User[]>> {
    const params = new HttpParams({
      fromObject: {
        pageNumber: page.toString(),
        pageSize: itemsPerPage.toString(),
        ...userParams,
        likers: likesParam === 'Likers',
        likees: likesParam === 'Likees'
      }
    });

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
    return this.http.post(`${this.url}/${userId}/photos/${id}/setMain`, null);
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(`${this.url}/${userId}/photos/${id}`);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(`${this.url}/${id}/like/${recipientId}`, null);
  }

}
