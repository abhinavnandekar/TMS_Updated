import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApitrackerComponent } from './apitracker.component';

describe('ApitrackerComponent', () => {
  let component: ApitrackerComponent;
  let fixture: ComponentFixture<ApitrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApitrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApitrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
