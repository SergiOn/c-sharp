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
  pagination: Pagination;
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
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).subscribe(
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
    this.pagination = { ...this.pagination, currentPage: event.page };
    this.loadMessages();
  }

  deleteMessage(id: number): void {

  }

}
