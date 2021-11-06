import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDayComponent } from './result-day.component';

describe('ResultDayComponent', () => {
  let component: ResultDayComponent;
  let fixture: ComponentFixture<ResultDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
