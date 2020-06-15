import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ElementsComponent } from './components/elements_module/elements/elements.component';
import { CreateElementComponent } from './components/elements_module/create-element/create-element.component';
import { ProcessesComponent } from './components/processes_module/processes/processes.component';
import { ViewElementComponent } from './components/elements_module/view-element/view-element.component';
import { EditElementComponent } from './components/elements_module/edit-element/edit-element.component';
import { EditProcessComponent } from './components/processes_module/edit-process/edit-process.component';
import { ViewProcessComponent } from './components/processes_module/view-process/view-process.component';
import { CreateRelationComponent } from './components/relation_module/create-relation/create-relation.component';
import { RelationsComponent } from './components/relation_module/relations/relations.component';
import { EditRelationComponent } from './components/relation_module/edit-relation/edit-relation.component';
import { CreateProcessComponent } from './components/processes_module/create-process/create-process.component';


@NgModule({
  declarations: [
    ElementsComponent,
    CreateElementComponent,
    ViewElementComponent,
    ProcessesComponent,
    EditElementComponent,
    CreateProcessComponent,
    EditProcessComponent,
    ViewProcessComponent,
    CreateRelationComponent,
    RelationsComponent,
    EditRelationComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    CollapseModule.forRoot()
  ],
  exports: [CollapseModule],
  providers: []
})
export class CoreModule {}
