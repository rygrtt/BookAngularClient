import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesBoxComponent } from './notes-box.component';

describe('NotesBoxComponent', () => {
  let component: NotesBoxComponent;
  let fixture: ComponentFixture<NotesBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
