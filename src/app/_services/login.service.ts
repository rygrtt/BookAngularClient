import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {of} from 'rxjs/observable/of';

@Injectable()
export class LoginService {

  private loginUrl = 'http://localhost:8080/login';

  /* Using a Subject instead of Observable in order to both send/read data...
  * ... and we're using a BehaviorSubject because it takes an initial value (here false)
  * (shoutout to this answer:
  * https://stackoverflow.com/questions/40393703/rxjs-observable-angular-2-on-localstorage-change */
  private logger = new BehaviorSubject<boolean>(false);
  private message = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  getMessage(): string {
    return this.message.getValue();
  }

  isLoggedIn(): boolean {
    return this.logger.getValue();
  }

  login(username: string, password: string): void {
    const body = 'username=' + username + '&password=' + password;

    this.http
      .post(this.loginUrl, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded',
        ),
        responseType: 'text'
      })
      .subscribe(
        response => {
          this.setToken(response);
          this.logger.next(true);
          this.message.next('Logged in!');
        },
        error => {
          console.log(error);
          this.message.next('Login Error');
        }
      );
  }

  setToken(response: string): void {
    localStorage.setItem('currentUser', JSON.stringify(response));
    this.logger.next(true);
  }

  logout(): void {
    localStorage.clear();
    this.logger.next(false);
    this.message.next('');
  }
}
