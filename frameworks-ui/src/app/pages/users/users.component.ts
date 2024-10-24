import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { iUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users!: iUser[];
  userId!: number;
  isSuccess: boolean = false;

  constructor(private userSvc: UserService) {}

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('authData')!).userId;

    this.userSvc.getUsers(this.userId).subscribe({
      next: (users: iUser[]) => {
        (this.isSuccess = true), (this.users = users);
      },
      error: (error: string) => (this.isSuccess = false),
    });
  }
}
