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
import { ViewNodeComponent } from './components/nodes_module/view-node/view-node.component';
import { EditNodeComponent } from './components/nodes_module/edit-node/edit-node.component';
import { EditGraphComponent } from './components/graphs_module/edit-graph/edit-graph.component';
import { ViewGraphComponent } from './components/graphs_module/view-graph/view-graph.component';
import { CreateNodesGraphComponent } from './components/nodesGraph_module/create-nodes-graph/create-nodes-graph.component';
import { NodesGraphComponent } from './components/nodesGraph_module/nodes-graph/nodes-graph.component';
import { EditNodesGraphComponent } from './components/nodesGraph_module/edit-nodes-graph/edit-nodes-graph.component';
import { CreateGraphComponent } from './components/graphs_module/create-graph/create-graph.component';


@NgModule({
  declarations: [
    NodesComponent,
    GraphsComponent,
    CreateNodeComponent,
    ViewNodeComponent,
    EditNodeComponent,
    CreateGraphComponent,
    EditGraphComponent,
    ViewGraphComponent,
    CreateNodesGraphComponent,
    NodesGraphComponent,
    EditNodesGraphComponent
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
