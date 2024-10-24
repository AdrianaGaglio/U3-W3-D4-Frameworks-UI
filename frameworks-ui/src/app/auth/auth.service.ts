import { iAuthdata } from './../interfaces/iauthdata';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { iUser } from '../interfaces/iuser';
import { iLoginrequest } from '../interfaces/iloginrequest';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
    this.restoreAuthData();
  }

  jwtHelper: JwtHelperService = new JwtHelperService();
  autoLogoutTimer: any;
  authData$ = new BehaviorSubject<iAuthdata | null>(null);
  user$ = this.authData$.asObservable().pipe(map((authData) => authData?.user));

  registerUrl = 'http://localhost:3000/register/';
  loginUrl = 'http://localhost:3000/login/';

  isLoggedIn$ = this.authData$.pipe(map((accessData) => !!accessData));

  register(user: Partial<iUser>): Observable<iAuthdata> {
    return this.http
      .post<iAuthdata>(this.registerUrl, user)
      .pipe(
        catchError((error) => {
          return throwError(() => {
            let message = '';
            if (error.status > 400 && error.status < 500) {
              message = 'Not found';
            } else if (error.status === 500) {
              message = 'Request error';
            }
            return message;
          });
        })
      )
      .pipe(
        tap((iAuthdata) => {
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 500);
        })
      );
  }

  login(login: iLoginrequest): Observable<iAuthdata> {
    // faccio la richiesta di login
    return this.http
      .post<iAuthdata>(this.loginUrl, login)
      .pipe(
        // dalla richiesta, intercetto la risposta e la passo al behaviorSubject e al localstorage
        tap((authData: iAuthdata) => {
          this.authData$.next(authData);
          localStorage.setItem('authData', JSON.stringify(authData));
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 500);

          //Recupero la data di scadenza del token
          const expDate = this.jwtHelper.getTokenExpirationDate(
            authData.accessToken
          );

          //se c'è un errore con la data blocca la funzione
          if (!expDate) return;

          //Avvio il logout automatico.
          this.autoLogout(expDate);
        })
      )
      .pipe(
        catchError((error) => {
          return throwError(() => {
            let message = '';
            if (error.status > 400 && error.status < 500) {
              message = 'Not found';
            } else if (error.status === 500) {
              message = 'Request error';
            }
            return message;
          });
        })
      );
  }

  logout() {
    // pulisco i dati dal behavior subject e dal localstorage
    this.authData$.next(null);
    localStorage.removeItem('authData');
    // reindirizzo alla pagina login
    this.router.navigate(['/auth/login']);
  }

  autoLogout(expDate: Date) {
    // clearTimeout(this.autoLogoutTimer)
    const expMs = expDate.getTime() - new Date().getTime(); //sottraggo i ms della data attuale da quelli della data del jwt

    this.autoLogoutTimer = setTimeout(() => {
      //avvio un timer che fa logout allo scadere del tempo
      this.logout();
    }, expMs);
  }

  restoreAuthData() {
    // verifico se ci sono dati di accesso nel localstorage
    let authJSON = localStorage.getItem('authData');
    if (!authJSON) return;
    // se ci sono, li passo al behavior subject
    let accessData: iAuthdata = JSON.parse(authJSON);

    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) {
      //ora controllo se il token è scaduto, se lo è fermiamo la funzione ed eliminamo i dati scaduti dal localStorage
      localStorage.removeItem('accessData');
      return;
    }

    this.authData$.next(accessData);
  }
}
