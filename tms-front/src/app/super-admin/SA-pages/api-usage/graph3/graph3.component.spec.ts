import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph3Component } from './graph3.component';

describe('Graph3Component', () => {
  let component: Graph3Component;
  let fixture: ComponentFixture<Graph3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Graph3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Graph3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
