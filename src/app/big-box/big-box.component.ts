import { Component, OnInit } from '@angular/core';
import {LoadingService} from '../_services/loading.service';

@Component({
  selector: 'app-big-box',
  templateUrl: './big-box.component.html',
  styleUrls: ['./big-box.component.css'],
  providers: [LoadingService]
})
export class BigBoxComponent implements OnInit {

  title = 'Book Tracker';

  constructor() { }

  ngOnInit() {
  }

}
