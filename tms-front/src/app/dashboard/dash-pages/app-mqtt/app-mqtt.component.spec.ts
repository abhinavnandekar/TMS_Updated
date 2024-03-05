import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMqttComponent } from './app-mqtt.component';

describe('AppMqttComponent', () => {
  let component: AppMqttComponent;
  let fixture: ComponentFixture<AppMqttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMqttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMqttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
