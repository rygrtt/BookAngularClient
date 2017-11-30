import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Citation} from '../_models/citation';
import {ErrorHandlerService} from './error-handler.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CitationService {

  private citationUrl = 'http://localhost:8080/api/citation';

  constructor(private http: HttpClient,
              private errorService: ErrorHandlerService) { }

  getCitation(noteId: number): Observable<any> {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    const url = this.citationUrl + '?noteid=' + noteId;

    return this.http
      .get<Citation>(url, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      })
      .pipe(
        catchError(this.errorService.handleError('getCitation', []))
      );

  }

}
