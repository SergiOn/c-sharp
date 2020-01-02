import { Component, Input } from '@angular/core';
import { User } from '../../_models/user';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent {

  @Input() user: User;

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService,
  ) {
  }

  getPhotoUrl() {
    return this.user.photoUrl || '/assets/user.png';
  }

  sendLike(id: number = this.user.id) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success(`You have liked: ${this.user.knownAs}`);
    }, error => {
      this.alertify.error(error);
    });
  }

}
