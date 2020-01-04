import { Component, OnInit } from '@angular/core';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  users: User[] = [];
  pagination: Pagination = {} as Pagination;
  likesParam = 'Likers';

  private readonly pageNumber = 1;
  private readonly pageSize = 5;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.users = data.users.result;
    //   this.pagination = data.users.pagination;
    // });
    this.loadUsers();
  }

  loadUsers() {
    const pageNumber = this.pagination.currentPage || this.pageNumber;
    const pageSize = this.pagination.itemsPerPage || this.pageSize;
    this.userService.getUsers(pageNumber, pageSize, null, this.likesParam).subscribe((response: PaginatedResult<User[]>) => {
      this.users = response.result;
      this.pagination = response.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination = { ...this.pagination, currentPage: event.page };
    this.loadUsers();
  }

}
