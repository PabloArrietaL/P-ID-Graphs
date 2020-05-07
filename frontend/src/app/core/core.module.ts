import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NodesComponent } from './components/nodes_module/nodes/nodes.component';
import { CreateNodeComponent } from './components/nodes_module/create-node/create-node.component';
import { GraphsComponent } from './components/graphs_module/graphs/graphs.component';


@NgModule({
  declarations: [
    NodesComponent,
    GraphsComponent,
    CreateNodeComponent
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
