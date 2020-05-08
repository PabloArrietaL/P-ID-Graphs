import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ContentLayoutComponent } from './layout/modules/content-layout/content-layout.component';
import { HomeLayoutComponent } from './layout/modules/home-layout/home-layout.component';
import { NodesComponent } from '@app/components/nodes_module/nodes/nodes.component';
import { GraphsComponent } from '@app/components/graphs_module/graphs/graphs.component';
import { ViewGraphComponent } from '@app/components/graphs_module/view-graph/view-graph.component';
import { NodesGraphComponent } from '@app/components/nodesGraph_module/nodes-graph/nodes-graph.component';

const routes: Routes = [

  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeLayoutComponent,
      },
      {
        path: 'nodes',
        component: NodesComponent
      },
      {
        path: 'graphs',
        component: GraphsComponent
      },
      {
        path: 'graph-details',
        component: NodesGraphComponent
      },
      {
        path: 'graph/:id',
        component: ViewGraphComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
