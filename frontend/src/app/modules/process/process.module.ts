import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ProcessRoutingModule } from './process-routing.module';

// Components
import { ProcessesComponent } from './pages/processes/processes.component';
import { CreateProcessComponent } from './pages/create-process/create-process.component';
import { EditProcessComponent } from './pages/edit-process/edit-process.component';
import { ViewProcessComponent } from './pages/view-process/view-process.component';


@NgModule({
  declarations: [
    ProcessesComponent,
    CreateProcessComponent,
    EditProcessComponent,
    ViewProcessComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ProcessRoutingModule
  ],
})
export class ProcessModule { }
