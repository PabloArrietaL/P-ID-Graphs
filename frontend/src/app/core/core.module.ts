import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NodesComponent } from './components/nodes/nodes.component';
import { CreateGraphComponent } from './components/create-graph/create-graph.component';
import { GraphsComponent } from './components/graphs/graphs.component';


@NgModule({
  declarations: [
    NodesComponent,
    CreateGraphComponent,
    GraphsComponent
  ],
  imports: [
    HttpClientModule,
    CollapseModule.forRoot()
  ],
  exports: [CollapseModule],
  providers: []
})
export class CoreModule {}
