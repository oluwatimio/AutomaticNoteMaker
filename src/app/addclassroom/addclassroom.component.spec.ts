import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclassroomComponent } from './addclassroom.component';

describe('AddclassroomComponent', () => {
  let component: AddclassroomComponent;
  let fixture: ComponentFixture<AddclassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddclassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
