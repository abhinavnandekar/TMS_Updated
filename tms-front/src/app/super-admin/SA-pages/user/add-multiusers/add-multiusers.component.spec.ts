import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultiusersComponent } from './add-multiusers.component';

describe('AddMultiusersComponent', () => {
  let component: AddMultiusersComponent;
  let fixture: ComponentFixture<AddMultiusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultiusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMultiusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
