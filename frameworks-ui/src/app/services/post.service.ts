import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPost } from '../interfaces/ipost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/posts';

  getAllPosts() {
    return this.http.get<iPost[]>(this.apiUrl);
  }

  createPost(newPost: Partial<iPost>) {
    return this.http.post<iPost>(this.apiUrl, newPost);
  }

  deletePost(postId: number) {
    return this.http.delete<iPost>(`${this.apiUrl}/${postId}`);
  }

  editPost(editedPost: iPost) {
    return this.http.put<iPost>(`${this.apiUrl}/${editedPost.id}`, editedPost);
  }
}
