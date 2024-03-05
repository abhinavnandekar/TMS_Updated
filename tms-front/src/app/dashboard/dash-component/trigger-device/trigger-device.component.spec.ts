import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerDeviceComponent } from './trigger-device.component';

describe('TriggerDeviceComponent', () => {
  let component: TriggerDeviceComponent;
  let fixture: ComponentFixture<TriggerDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriggerDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
