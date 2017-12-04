import {Component, OnInit} from '@angular/core';
import {BookService} from '../_services/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  title: string;
  aFName: string;
  aLName: string;
  tFName: string;
  tLName: string;
  publisher: string;
  yearPublished: number;
  edition: string;

  constructor(private bookService: BookService,
              private router: Router) {
  }

  ngOnInit() {
  }

  addBook(): void {
    this.bookService.addBook(this.yearPublished, this.publisher, this.edition, this.title, this.aFName, this.aLName,
      this.tFName, this.tLName);

  }

  goBack(): void {
    this.bookService.clearMessage();
    this.router.navigateByUrl('/books');
  }

}
