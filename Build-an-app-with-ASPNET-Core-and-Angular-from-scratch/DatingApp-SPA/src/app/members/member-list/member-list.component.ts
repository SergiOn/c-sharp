import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { PaginatedResult, Pagination } from '../../_models/pagination';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  user: User;
  users: User[];
  pagination: Pagination = {} as Pagination;
  userParams: any = {};
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' }
  ];

  private readonly pageNumber = 1;
  private readonly pageSize = 5;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.users = data.users.result;
    // });
    this.user = this.authService.currentUser;
    this.loadUsers();

    this.userParams = {
      gender: this.user.gender === 'female' ? 'male' : 'female',
      minAge: 18,
      maxAge: 99,
      orderBy: 'lastActive'
    };
  }

  loadUsers() {
    const pageNumber = this.pagination.currentPage || this.pageNumber;
    const pageSize = this.pagination.itemsPerPage || this.pageSize;
    this.userService.getUsers(pageNumber, pageSize, this.userParams).subscribe((response: PaginatedResult<User[]>) => {
      this.users = response.result;
      this.pagination = response.pagination;
      console.log(response.pagination);
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any) {
    this.pagination = { ...this.pagination, currentPage: event.page };
    this.loadUsers();
  }

  resetFilters() {
    this.userParams = {
      ...this.userParams,
      gender: this.user.gender === 'female' ? 'male' : 'female',
      minAge: 18,
      maxAge: 99
    };
    this.loadUsers();
  }

}
