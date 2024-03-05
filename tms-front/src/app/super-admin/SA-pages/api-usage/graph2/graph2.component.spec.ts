import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph2Component } from './graph2.component';

describe('Graph2Component', () => {
  let component: Graph2Component;
  let fixture: ComponentFixture<Graph2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Graph2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Graph2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
