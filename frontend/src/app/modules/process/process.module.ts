import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ProcessRoutingModule } from './process-routing.module';
import { NgxFloatButtonModule } from 'ngx-float-button';

// Components
import { ProcessesComponent } from './pages/processes/processes.component';
import { CreateProcessComponent } from './pages/create-process/create-process.component';
import { EditProcessComponent } from './pages/edit-process/edit-process.component';
import { ViewProcessComponent } from './pages/view-process/view-process.component';
import { AddElementComponent } from './pages/add-element/add-element.component';
import { ProcessDetailComponent } from './pages/process-detail/process-detail.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { SynchronousRelationshipComponent } from './pages/synchronous-relationship/synchronous-relationship.component';
import { PermissiveRelationshipComponent } from './pages/permissive-relationship/permissive-relationship.component';
import { ViewElementComponent } from './pages/view-element/view-element.component';

@NgModule({
  declarations: [
    ProcessesComponent,
    CreateProcessComponent,
    EditProcessComponent,
    ViewProcessComponent,
    AddElementComponent,
    ProcessDetailComponent,
    TabsComponent,
    SynchronousRelationshipComponent,
    PermissiveRelationshipComponent,
    ViewElementComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ProcessRoutingModule,
    NgxFloatButtonModule
  ],
})
export class ProcessModule { }
