import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RelationRoutingModule } from './relation-routing.module';
import { SharedModule } from '@shared/shared.module';

// Components
import { RelationsComponent } from './relations/relations.component';
import { CreateRelationComponent } from './create-relation/create-relation.component';
import { EditRelationComponent } from './edit-relation/edit-relation.component';


@NgModule({
  declarations: [
    RelationsComponent,
    CreateRelationComponent,
    EditRelationComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RelationRoutingModule
  ],
})
export class RelationModule { }
