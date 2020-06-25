import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ElementRoutingModule } from './element-routing.module';

// Components
import { ElementsComponent } from './pages/elements/elements.component';
import { CreateElementComponent } from './pages/create-element/create-element.component';
import { EditElementComponent } from './pages/edit-element/edit-element.component';
import { ViewElementComponent } from './pages/view-element/view-element.component';


@NgModule({
  declarations: [
    ElementsComponent,
    CreateElementComponent,
    EditElementComponent,
    ViewElementComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ElementRoutingModule
  ],
})
export class ElementModule { }
