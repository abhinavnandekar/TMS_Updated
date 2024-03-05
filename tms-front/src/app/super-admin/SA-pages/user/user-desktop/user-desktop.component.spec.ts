import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDesktopComponent } from './user-desktop.component';

describe('UserDesktopComponent', () => {
  let component: UserDesktopComponent;
  let fixture: ComponentFixture<UserDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
