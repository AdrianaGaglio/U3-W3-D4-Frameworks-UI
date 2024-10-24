import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private authSvc: AuthService, private userSvc: UserService) {}

  user!: iUser;
  isChange: boolean = false;

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      if (!user) {
        return;
      }
      this.user = user;
    });
  }

  activateChange() {
    this.isChange = !this.isChange;
  }

  changePassword(user: iUser) {
    this.userSvc.changePassword(user).subscribe();
    this.isChange = false;
  }

  createPost() {}
}
