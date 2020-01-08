import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../_models/message';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = { content: '' };

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId).pipe(
      // tap(messages => {
      //   const currentUserId = +this.authService.decodedToken.nameid;
      //   messages
      //     .filter((message: Message) => !message.isRead && message.recipientId === currentUserId)
      //     .forEach((message: Message) => {
      //       this.userService.markAsRead(currentUserId, message.id);
      //     });
      // })
    ).subscribe(
      messages => {
        this.messages = messages;
        this.markMessageAsRead(messages);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  private markMessageAsRead(messages: Message[]): void {
    const currentUserId = +this.authService.decodedToken.nameid;
    messages
      .filter((message: Message) => !message.isRead && message.recipientId === currentUserId)
      .forEach((message: Message) => {
        this.userService.markAsRead(currentUserId, message.id).subscribe();
      });
  }

  sendMessage(): void {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          this.messages.unshift(message);
          this.newMessage.content = '';
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

}
