import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendVerifyComponent } from './send-verify.component';

describe('SendVerifyComponent', () => {
  let component: SendVerifyComponent;
  let fixture: ComponentFixture<SendVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
