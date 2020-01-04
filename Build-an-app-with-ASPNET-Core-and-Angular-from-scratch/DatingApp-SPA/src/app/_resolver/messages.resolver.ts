import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { PaginatedResult } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Injectable()
export class MessagesResolver implements Resolve<PaginatedResult<Message[]>> {
  private readonly pageNumber = 1;
  private readonly pageSize = 5;
  private readonly messageContainer = 'Unread';

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<Message[]>> {
    return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving messages');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
