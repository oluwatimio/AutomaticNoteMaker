import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateclassroomComponent } from './createclassroom.component';

describe('CreateclassroomComponent', () => {
  let component: CreateclassroomComponent;
  let fixture: ComponentFixture<CreateclassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateclassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateclassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
