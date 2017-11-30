import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from '../_models/book';
import {Observable} from 'rxjs/Observable';
import {JwtHelper} from 'angular2-jwt';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';
import {AddBookWrapper} from '../_models/add-book-wrapper';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class BookService {

  private bookUrl = 'http://localhost:8080/api/books';
  jwtHelper: JwtHelper = new JwtHelper();

  private message = new BehaviorSubject<string>('');

  constructor(private http: HttpClient,
              private errorService: ErrorHandlerService) {
  }

  getMessage(): string {
    return this.message.getValue();
  }

  getBooks(): Observable<Book[]> {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    const id = this.jwtHelper.decodeToken(token).jti;
    const url = this.bookUrl + '?userid=' + id;

    return this.http
      .get<Book[]>(url, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      })
      .pipe(
        catchError(this.errorService.handleError('getHeroes', []))
      );
  }

  addBook(yearPublished, publisher, edition, title, aFName, aLName, tFName, tLName): void {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    const id = this.jwtHelper.decodeToken(token).jti;
    const url = this.bookUrl + '/new?userid=' + id;

    const body =
      'title=' + title +
      '&publisher=' + publisher +
      '&yearpublished=' + yearPublished +
      '&edition=' + edition +
      '&afirstname=' + aFName +
      '&alastname=' + aLName +
      '&tfirstname=' + tFName +
      '&tlastname=' + tLName;

    /*const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Authorization', 'Bearer ' + token);*/
    // .set('Authorization', 'Bearer ' + token)

    this.http
      .post(url, body, {headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token)})
      .subscribe(
        response => {
          this.message.next('Book added!');
        },
        error => {
          console.log(error);
          this.message.next('Server error.');
        }
      );
  }
}
