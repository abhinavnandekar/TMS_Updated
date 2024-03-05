import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMobileComponent } from './company-mobile.component';

describe('CompanyMobileComponent', () => {
  let component: CompanyMobileComponent;
  let fixture: ComponentFixture<CompanyMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
