import {Component, OnInit} from '@angular/core';
import {Book} from '../_models/book';
import {BookService} from '../_services/book.service';
import {LoginService} from '../_services/login.service';
import {LoadingService} from '../_services/loading.service';

@Component({
  selector: 'app-book-box',
  templateUrl: './book-box.component.html',
  styleUrls: ['./book-box.component.css']
})

export class BookBoxComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService,
              private loginService: LoginService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => {
        this.books = books;
      });
  }

  loadNotes(book: Book): void {
    this.loadingService.loadNotes(book);
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

}
