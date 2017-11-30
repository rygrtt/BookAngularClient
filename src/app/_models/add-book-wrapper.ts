import {Book} from './book';
import {Person} from './person';

// a class for wrapping form data to send to the server as a single object
export class AddBookWrapper {
  book: Book;
  author: Person;
  translator: Person;
}
