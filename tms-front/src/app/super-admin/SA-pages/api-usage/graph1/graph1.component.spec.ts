import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph1Component } from './graph1.component';

describe('Graph1Component', () => {
  let component: Graph1Component;
  let fixture: ComponentFixture<Graph1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Graph1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Graph1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
