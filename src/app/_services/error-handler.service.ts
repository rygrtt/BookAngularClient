import {Injectable} from '@angular/core';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ErrorHandlerService {

  constructor() {
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation + ': ' + error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
