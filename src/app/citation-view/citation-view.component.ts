import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoadingService} from '../_services/loading.service';
import {Citation} from '../_models/citation';

@Component({
  selector: 'app-citation-view',
  templateUrl: './citation-view.component.html',
  styleUrls: ['./citation-view.component.css']
})
export class CitationViewComponent implements OnInit, AfterViewChecked {

  citation: Citation;
  fullCitation: string;

  constructor(private loadingService: LoadingService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.update();
  }

  update(): void {
    this.citation = (this.loadingService.getCurrentCitation());
    this.buildCitation();
    this.cdr.detectChanges();
  }

  buildCitation(): void {
    let pages: string;

    if (this.citation.pageNoteBegins === this.citation.pageNoteEnds) {
      pages = String(this.citation.pageNoteBegins);
    } else {
      pages = this.citation.pageNoteBegins + '-' + this.citation.pageNoteEnds;
    }

    this.fullCitation =
      this.citation.aLname + ', ' + this.citation.aFname + '.' +
      '<i>' + this.citation.title + '</i>. ' +
      pages + '.' +
      this.citation.publisher + ', ' + this.citation.yearPublished + '.';

  }
}
