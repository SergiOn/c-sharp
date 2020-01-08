import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/message';

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

  updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, user);
  }

  setMainPhoto(userId: number, id: number): Observable<void> {
    return this.http.post<void>(`${this.url}/${userId}/photos/${id}/setMain`, null);
  }

  deletePhoto(userId: number, id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${userId}/photos/${id}`);
  }

  sendLike(id: number, recipientId: number): Observable<void> {
    return this.http.post<void>(`${this.url}/${id}/like/${recipientId}`, null);
  }

  // getMessages(id: number, page?: number, itemsPerPage?: number, messageContainer?: string): Observable<PaginatedResult<Message[]>> {
  getMessages(
    id: number,
    page: number = 1,
    itemsPerPage: number = 5,
    messageContainer: string = 'Unread'
  ): Observable<PaginatedResult<Message[]>> {
    // let params = new HttpParams()
    //   .append('MessageContainer', messageContainer);
    //
    // if (page != null && itemsPerPage != null) {
    //   params = params
    //     .append('pageNumber', page.toString())
    //     .append('pageSize', itemsPerPage.toString());
    // }

    const params = new HttpParams({
      fromObject: {
        MessageContainer: messageContainer,
        pageNumber: page.toString(),
        pageSize: itemsPerPage.toString()
      }
    });

    return this.http
      .get<Message[]>(`${this.url}/${id}/messages`, { observe: 'response', params })
      .pipe(
        map(response => new PaginatedResult<Message[]>(response.body, JSON.parse(response.headers.get('Pagination'))))
      );
  }

  getMessageThread(id: number, recipientId: number) {
    return this.http.get<Message[]>(`${this.url}/${id}/messages/thread/${recipientId}`);
  }

  sendMessage(id: number, message: Message) {
    return this.http.post(`${this.url}/${id}/messages`, message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(this.url + '/' + userId + '/messages/' + id, null);
  }

}
