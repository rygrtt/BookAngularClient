import {Component, OnInit} from '@angular/core';
import {AddBookWrapper} from '../_models/add-book-wrapper';
import {BookService} from '../_services/book.service';

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

  private formData: AddBookWrapper;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
  }

  addBook() {

    const formData = {
      book:
        {
          bookId: 0,
          userId: 0,
          yearPublished: this.yearPublished,
          publisher: this.publisher,
          edition: this.edition,
          title: this.title,
          authorId: 0,
          translatorId: 0
        },
      author:
        {
          firstName: this.aFName,
          lastName: this.aLName
        },
      translator:
        {
          firstName: this.tFName,
          lastName: this.tLName
        }

    };

  /*  this.formData.author['fName'] = this.aFName;
    this.formData.author.lName = this.aLName;
    this.formData.translator.fName = this.tFName;
    this.formData.translator.lName = this.tLName;
    this.formData.book.title = this.title;
    this.formData.book.edition = this.edition;
    this.formData.book.yearPublished = this.yearPublished;
    this.formData.book.publisher = this.publisher;*/

    this.bookService.addBook(this.yearPublished, this.publisher, this.edition, this.title, this.aFName, this.aLName,
      this.tFName, this.tLName);
  }

}
