import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewRegisterComponent } from './interview-register.component';

describe('InterviewRegisterComponent', () => {
  let component: InterviewRegisterComponent;
  let fixture: ComponentFixture<InterviewRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
