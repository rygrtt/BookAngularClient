import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Note} from '../_models/note';
import {ErrorHandlerService} from './error-handler.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {JwtHelper} from 'angular2-jwt';


@Injectable()
export class NoteService {

  private noteUrl = 'http://localhost:8080/api/notes';
  jwtHelper: JwtHelper = new JwtHelper();

  private message = new BehaviorSubject<string>('');

  constructor(private http: HttpClient,
              private errorService: ErrorHandlerService) {
  }

  clearMessage(): void {
    this.message.next('');
  }

  getMessage(): string {
    return this.message.getValue();
  }

  getNotes(bookId: number): Observable<Note[]> {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    const url = this.noteUrl + '?bookid=' + bookId;

    return this.http
      .get<Note[]>(url, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      })
      .pipe(
        catchError(this.errorService.handleError('getNotes', []))
      );
  }

  addNote(text: string, pageNoteBegins: number, pageNoteEnds: number, bookId: number): void {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    const url = this.noteUrl + '/new?bookid=' + bookId;

    const body =
      'text=' + text +
      '&pagenotebegins=' + pageNoteBegins +
      '&pagenoteends=' + pageNoteEnds;

    this.http
      .post(url, body, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + token),
        responseType: 'text'
      })
      .subscribe(
        () => {
          this.message.next('Note added!');
        },
        error => {
          console.log(error);
          this.message.next('Server error.');
        }
      );
  }
}
