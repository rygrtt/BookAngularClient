import {
  AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit,
  ViewChild
} from '@angular/core';
import {Note} from '../_models/note';
import {NoteService} from '../_services/note.service';
import {ActivatedRoute} from '@angular/router';
import {LoadingService} from '../_services/loading.service';

@Component({
  selector: 'app-notes-box',
  templateUrl: './notes-box.component.html',
  styleUrls: ['./notes-box.component.css']
})
export class NotesBoxComponent implements OnInit, AfterViewChecked {

  notes: Note[];

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    if (this.loadingService.doNotesNeedUpdate()) {
      this.update();
    }
  }

  update(): void {
    this.loadingService.notes$.subscribe(notes => {
      this.notes = notes;
    });

    this.loadingService.setNotesAsUpdated();
  }

  doLoadNoteView(note: Note): void {
    this.loadingService.loadNoteCitation(note);
  }
}
