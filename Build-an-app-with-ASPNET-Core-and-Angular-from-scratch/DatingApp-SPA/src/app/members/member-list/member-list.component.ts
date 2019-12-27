import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { PaginatedResult } from '../../_models/pagination';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  users: User[];
  private readonly pageNumber = 1;
  private readonly pageSize = 5;

  constructor(private route: ActivatedRoute, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.users = data.users.result;
    // });
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pageNumber, this.pageSize).subscribe((users: PaginatedResult<User[]>) => {
      this.users = users.result;
    }, error => {
      this.alertify.error(error);
    });
  }

}
