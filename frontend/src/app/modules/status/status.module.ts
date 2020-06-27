import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { StatusRoutingModule } from './status-routing.module';


// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { SharedModule } from '@shared/shared.module';
import { StatusComponent } from './pages/status/status.component';
import { CreateStatusComponent } from './pages/create-status/create-status.component';
import { EditStatusComponent } from './pages/edit-status/edit-status.component';


@NgModule({
  declarations: [StatusComponent, CreateStatusComponent, EditStatusComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    StatusRoutingModule,
    
  ]
})
export class StatusModule { }
