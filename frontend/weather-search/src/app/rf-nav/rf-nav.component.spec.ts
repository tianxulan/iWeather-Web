import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfNavComponent } from './rf-nav.component';

describe('RfNavComponent', () => {
  let component: RfNavComponent;
  let fixture: ComponentFixture<RfNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
