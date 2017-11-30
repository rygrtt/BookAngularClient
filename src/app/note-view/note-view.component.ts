import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Note} from '../_models/note';
import {LoadingService} from '../_services/loading.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit, AfterViewChecked {

  note: Note;

  constructor(private loadingService: LoadingService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.update();
  }

  update(): void {
    this.note = (this.loadingService.getCurrentNote());
    this.cdr.detectChanges();
  }
}
