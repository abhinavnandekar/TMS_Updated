import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlarmsComponent } from './edit-alarms.component';

describe('EditAlarmsComponent', () => {
  let component: EditAlarmsComponent;
  let fixture: ComponentFixture<EditAlarmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAlarmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
