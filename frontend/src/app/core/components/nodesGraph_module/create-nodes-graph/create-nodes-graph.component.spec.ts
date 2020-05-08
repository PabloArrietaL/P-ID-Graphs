import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNodesGraphComponent } from './create-nodes-graph.component';

describe('CreateNodesGraphComponent', () => {
  let component: CreateNodesGraphComponent;
  let fixture: ComponentFixture<CreateNodesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNodesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNodesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
