import {Injectable} from '@angular/core';
import {NoteService} from './note.service';
import {Note} from '../_models/note';
import {Observable} from 'rxjs/Observable';
import {CitationService} from './citation.service';
import {Citation} from '../_models/citation';
import {Book} from '../_models/book';


// a service sharing data among components
// and controlling when they load
@Injectable()
export class LoadingService {

  notes$: Observable<Note[]>;
  notesNeedUpdate = false;

  currentBook: Book;
  currentNote: Note;

  currentCitation: Citation;

  constructor(private noteService: NoteService,
              private citationService: CitationService) {
  }


  loadNotes(book: Book): void {
    this.notesNeedUpdate = true;
    this.currentBook = book;
    this.notes$ = this.noteService.getNotes(book.bookId);
  }

  doNotesNeedUpdate(): boolean {
    return this.notesNeedUpdate;
  }

  setNotesAsUpdated(): void {
    this.notesNeedUpdate = false;
  }

  loadNoteCitation(note: Note): void {
    this.currentNote = note;
    this.citationService.getCitation(note.noteId)
      .subscribe(citation => {
        this.currentCitation = citation;
      });

  }

  getCurrentBook(): Book {
    return this.currentBook;
  }

  getCurrentNote(): Note {
    return this.currentNote;
  }

  getCurrentCitation(): Citation {
    return this.currentCitation;
  }

}
