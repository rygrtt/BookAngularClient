import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Note} from '../_models/note';
import {ErrorHandlerService} from './error-handler.service';


@Injectable()
export class NoteService {

  private noteUrl = 'http://localhost:8080/api/notes';

  constructor(private http: HttpClient,
              private errorService: ErrorHandlerService) {
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
}
