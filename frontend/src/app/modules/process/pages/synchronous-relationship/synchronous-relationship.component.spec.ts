import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynchronousRelationshipComponent } from './synchronous-relationship.component';

describe('SynchronousRelationshipComponent', () => {
  let component: SynchronousRelationshipComponent;
  let fixture: ComponentFixture<SynchronousRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynchronousRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynchronousRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
