import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAFooterComponent } from './sa-footer.component';

describe('SAFooterComponent', () => {
  let component: SAFooterComponent;
  let fixture: ComponentFixture<SAFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SAFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SAFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
