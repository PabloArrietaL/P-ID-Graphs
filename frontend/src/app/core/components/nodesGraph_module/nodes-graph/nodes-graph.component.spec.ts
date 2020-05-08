import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesGraphComponent } from './nodes-graph.component';

describe('NodesGraphComponent', () => {
  let component: NodesGraphComponent;
  let fixture: ComponentFixture<NodesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
