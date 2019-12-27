import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { PaginatedResult, Pagination } from '../../_models/pagination';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;

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
    const pagination = this.pagination || {} as Pagination;
    const pageNumber = pagination.currentPage || this.pageNumber;
    const pageSize = pagination.itemsPerPage || this.pageSize;
    this.userService.getUsers(pageNumber, pageSize).subscribe((response: PaginatedResult<User[]>) => {
      this.users = response.result;
      this.pagination = response.pagination;
      console.log(response.pagination);
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
