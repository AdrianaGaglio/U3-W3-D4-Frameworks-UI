import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  message!: string;
  isSuccess: boolean = false;

  constructor(private fb: FormBuilder, private authSvc: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  ngDoCheck() {}

  login() {
    if (this.loginForm.valid)
      this.authSvc.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.isSuccess = true;
          this.message = 'Logged in successfully';
        },
        error: (error) => {
          this.isSuccess = false;
          this.message = error;
        },
      });
  }
}
