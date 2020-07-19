import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissiveRelationshipComponent } from './permissive-relationship.component';

describe('PermissiveRelationshipComponent', () => {
  let component: PermissiveRelationshipComponent;
  let fixture: ComponentFixture<PermissiveRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissiveRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissiveRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
