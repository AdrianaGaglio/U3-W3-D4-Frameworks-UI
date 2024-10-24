import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authSvc: AuthService) {}

  isLogged!: boolean;

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((res) => (this.isLogged = res));
  }

  logout() {
    this.authSvc.logout();
  }
}
