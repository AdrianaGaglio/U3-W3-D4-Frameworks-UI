import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private authSvc: AuthService) {}

  message!: string;
  isSuccess: boolean = false;

  registerForm!: FormGroup;
  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  isValid() {}

  register() {
    if (this.registerForm.valid)
      this.authSvc.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.isSuccess = true;
          this.message = 'Registered successfully';
        },
        error: (err) => {
          this.isSuccess = false;
          this.message = err;
        },
      });
  }
}
