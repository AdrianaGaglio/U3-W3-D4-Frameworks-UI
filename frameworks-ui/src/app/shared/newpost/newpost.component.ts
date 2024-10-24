import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { iPost } from '../../interfaces/ipost';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrl: './newpost.component.scss',
})
export class NewpostComponent {
  constructor(private postSvc: PostService, private fb: FormBuilder) {}

  newPost!: FormGroup;

  ngOnInit() {
    this.newPost = this.fb.group({
      title: this.fb.control(''),
      description: this.fb.control(''),
      userId: this.fb.control(
        JSON.parse(localStorage.getItem('authData')!).user.id
      ),
      email: this.fb.control(
        JSON.parse(localStorage.getItem('authData')!).user.email
      ),
    });
  }
}
