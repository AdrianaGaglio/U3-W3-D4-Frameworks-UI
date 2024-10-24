import { Component, TemplateRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { iPost } from '../../interfaces/ipost';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrl: './newpost.component.scss',
})
export class NewpostComponent {
  modalService: any;
  constructor(private postSvc: PostService, private fb: FormBuilder) {}

  newPost!: FormGroup;
  message!: string;
  isSuccess: boolean = false;

  ngOnInit() {
    this.newPost = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      userid: this.fb.control(
        JSON.parse(localStorage.getItem('authData')!).user.id
      ),
      email: this.fb.control(
        JSON.parse(localStorage.getItem('authData')!).user.email
      ),
    });
  }

  addPost() {
    if (this.newPost.valid)
      this.postSvc.createPost(this.newPost.value).subscribe({
        next: (data) => {
          this.isSuccess = true;
          this.message = 'Post created successfully';
        },
        error: (error) => {
          this.isSuccess = false;
          this.message = error;
        },
      });
  }
}
