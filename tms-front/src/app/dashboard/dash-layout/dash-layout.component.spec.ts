import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLayoutComponent } from './dash-layout.component';

describe('DashLayoutComponent', () => {
  let component: DashLayoutComponent;
  let fixture: ComponentFixture<DashLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
