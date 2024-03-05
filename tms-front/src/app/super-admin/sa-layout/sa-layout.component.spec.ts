import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SALayoutComponent } from './sa-layout.component';

describe('SALayoutComponent', () => {
  let component: SALayoutComponent;
  let fixture: ComponentFixture<SALayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SALayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SALayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
