import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDesktopComponent } from './company-desktop.component';

describe('CompanyDesktopComponent', () => {
  let component: CompanyDesktopComponent;
  let fixture: ComponentFixture<CompanyDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
