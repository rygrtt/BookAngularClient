import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NoteService} from '../_services/note.service';
import {LoadingService} from '../_services/loading.service';
import {Book} from '../_models/book';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit, AfterViewChecked {

  text: string;
  pageNoteBegins: number;
  pageNoteEnds: number;
  book: Book;
  // TODO: add textarea to form
  // TODO: make redirects work

  message: string;



  constructor(private noteService: NoteService,
              private loadingService: LoadingService,
              private router: Router) {


  }

  ngOnInit() {
    this.book = this.loadingService.getCurrentBook();
  }

  ngAfterViewChecked() {
    this.message = this.noteService.getMessage();
  }


  addNote(): void {
    this.noteService.addNote(this.text, this.pageNoteBegins, this.pageNoteEnds, this.book.bookId);
  }

  goBack(): void {
    this.noteService.clearMessage();
    this.router.navigateByUrl('/books');
  }
}


