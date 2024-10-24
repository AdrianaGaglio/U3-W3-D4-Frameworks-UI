import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { iPost } from '../../interfaces/ipost';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(
    private authSvc: AuthService,
    private userSvc: UserService,
    private postSvc: PostService
  ) {}

  user!: iUser;
  isChange: boolean = false;

  posts!: iPost[];

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      if (!user) {
        return;
      }
      this.user = user;
      this.postSvc.getPostByUserId(this.user.id).subscribe((res) => {
        this.posts = res;
      });
    });
  }

  activateChange() {
    this.isChange = !this.isChange;
  }

  changePassword(user: iUser) {
    this.userSvc.changePassword(user).subscribe();
    this.isChange = false;
  }
}
