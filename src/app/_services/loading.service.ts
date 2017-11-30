import {Injectable} from '@angular/core';
import {NoteService} from './note.service';
import {Note} from '../_models/note';
import {Observable} from 'rxjs/Observable';
import {CitationService} from './citation.service';
import {Citation} from '../_models/citation';


// a shared service monitoring the state of components
// and controlling when they load
@Injectable()
export class LoadingService {

  notes$: Observable<Note[]>;
  notesNeedUpdate = false;

  currentNote: Note;

  currentCitation: Citation;

  constructor(private noteService: NoteService,
              private citationService: CitationService) {
  }


  loadNotes(bookId: number): void {
    this.notesNeedUpdate = true;
    this.notes$ = this.noteService.getNotes(bookId);
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

  getCurrentNote(): Note {
    return this.currentNote;
  }

  getCurrentCitation(): Citation {
    return this.currentCitation;
  }

}
