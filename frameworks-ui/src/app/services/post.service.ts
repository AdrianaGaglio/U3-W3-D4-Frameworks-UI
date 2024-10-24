import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPost } from '../interfaces/ipost';
import { catchError, map, throwError } from 'rxjs';

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
    return this.http.post<iPost>(this.apiUrl, newPost).pipe(
      catchError((error) => {
        return throwError(() => {
          let message = '';
          if (error.status >= 400 && error.status < 500) {
            message = 'Not found';
          } else if (error.status === 500) {
            message = 'Request error';
          }
          return message;
        });
      })
    );
  }

  deletePost(postId: number) {
    return this.http.delete<iPost>(`${this.apiUrl}/${postId}`);
  }

  editPost(editedPost: iPost) {
    return this.http.put<iPost>(`${this.apiUrl}/${editedPost.id}`, editedPost);
  }

  getPostByUserId(userId: number) {
    return this.http
      .get<iPost[]>(this.apiUrl)
      .pipe(map((posts) => posts.filter((post) => post.userid === userId)));
  }
}
