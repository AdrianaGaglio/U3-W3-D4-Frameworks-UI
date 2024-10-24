import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iUser } from '../interfaces/iuser';
import { catchError, filter, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  changePassword(user: iUser) {
    return this.http.put(`http://localhost:3000/users/${user.id}`, user);
  }

  getUsers(userId: number) {
    return this.http
      .get<iUser[]>('http://localhost:3000/users/')
      .pipe(
        map((users: iUser[]) => {
          // Filtra gli utenti con id diverso da userId
          return users.filter((user) => user.id !== userId);
        })
      )
      .pipe(
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
}
