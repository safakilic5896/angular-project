import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueDataComponent } from './dialogue-data.component';

describe('DialogueDataComponent', () => {
  let component: DialogueDataComponent;
  let fixture: ComponentFixture<DialogueDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
