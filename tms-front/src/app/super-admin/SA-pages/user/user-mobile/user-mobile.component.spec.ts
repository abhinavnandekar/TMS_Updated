import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMobileComponent } from './user-mobile.component';

describe('UserMobileComponent', () => {
  let component: UserMobileComponent;
  let fixture: ComponentFixture<UserMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
