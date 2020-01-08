import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  private readonly pageNumber = 1;
  private readonly pageSize = 5;

  messages: Message[];
  pagination: Pagination = {} as Pagination;
  messageContainer = 'Unread';

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(): void {
    const pageNumber = this.pagination.currentPage || this.pageNumber;
    const pageSize = this.pagination.itemsPerPage || this.pageSize;
    this.userService.getMessages(this.authService.decodedToken.nameid, pageNumber, pageSize, this.messageContainer).subscribe(
      (response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
      },
      error => {
        this.alertify.error('Problem retrieving messages');
        this.router.navigate(['/home']);
      }
    );
  }

  pageChanged(event: any): void {
    console.log(event);
    this.pagination = { ...this.pagination, currentPage: event.page };
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertify.confirm(
      'Are you sure you want to delete this message?',
      () => {
        this.userService
          .deleteMessage(id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.messages.splice(
                this.messages.findIndex(m => m.id === id),
                1
              );
              this.alertify.success('Message has been deleted');
            },
            error => {
              this.alertify.error('Failed to delete the message');
            }
          );
      }
    );
  }

}
