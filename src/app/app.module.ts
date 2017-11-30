import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {BookBoxComponent} from './book-box/book-box.component';
import {NotesBoxComponent} from './notes-box/notes-box.component';
import {NoteViewComponent} from './note-view/note-view.component';
import {CitationViewComponent} from './citation-view/citation-view.component';
import {BookService} from './_services/book.service';
import {LoginComponent} from './login/login.component';
import {LoginService} from './_services/login.service';
import {BigBoxComponent} from './big-box/big-box.component';
import {NoteService} from './_services/note.service';
import {CitationService} from './_services/citation.service';
import {ErrorHandlerService} from './_services/error-handler.service';
import { AddBookComponent } from './add-book/add-book.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { MediumBoxComponent } from './medium-box/medium-box.component';

const appRoutes: Routes = [
  {path: 'books', component: MediumBoxComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-book', component: AddBookComponent},
  {path: 'add-note', component: AddNoteComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookBoxComponent,
    NotesBoxComponent,
    NoteViewComponent,
    CitationViewComponent,
    BigBoxComponent,
    AddBookComponent,
    AddNoteComponent,
    MediumBoxComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BookService, LoginService, NoteService, CitationService, ErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
