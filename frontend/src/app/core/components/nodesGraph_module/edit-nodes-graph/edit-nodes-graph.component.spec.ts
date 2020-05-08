import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNodesGraphComponent } from './edit-nodes-graph.component';

describe('EditNodesGraphComponent', () => {
  let component: EditNodesGraphComponent;
  let fixture: ComponentFixture<EditNodesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNodesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNodesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
