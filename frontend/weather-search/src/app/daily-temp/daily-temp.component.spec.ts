import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTempComponent } from './daily-temp.component';

describe('DailyTempComponent', () => {
  let component: DailyTempComponent;
  let fixture: ComponentFixture<DailyTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
