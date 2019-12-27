import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
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
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

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

}
