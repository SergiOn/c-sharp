import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { Photo } from '../../_models/photo';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  @ViewChild('memberTabs', {static: false})
  set memberTabsRef(value: TabsetComponent) {
    if (!value) {
      return;
    }
    this.memberTabs = value;
    setTimeout(() => {
      const { tab } = this.route.snapshot.queryParams;
      const tabId = tab > 0 ? tab : 0;
      this.selectTab(tabId);
    });
  }

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  private memberTabs: TabsetComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUser();
    // this.route.data.subscribe(data => {
    //   this.user = data.user;
    // });
  }

  loadUser() {
    this.userService.getUser(this.route.snapshot.params.id).subscribe((user: User) => {
      this.user = user;
      this.setupGalleryOptions();
    }, error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/members']);
    });
  }

  setupGalleryOptions() {
    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }];
    this.galleryImages = this.getImages();
  }

  getImages() {
    return this.user.photos.map((photo: Photo) => ({
      small: photo.url,
      medium: photo.url,
      big: photo.url,
      description: photo.description
    }));
  }

  getPhotoUrl() {
    return this.user.photoUrl || '/assets/user.png';
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

}
