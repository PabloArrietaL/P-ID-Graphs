import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ContentLayoutComponent } from './layout/modules/content-layout/content-layout.component';
import { HomeLayoutComponent } from './layout/modules/home-layout/home-layout.component';
import { NodesComponent } from '@app/components/nodes/nodes.component';
import { GraphsComponent } from '@app/components/graphs/graphs.component';
import { CreateGraphComponent } from '@app/components/create-graph/create-graph.component';

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
        path: 'create-graph',
        component: CreateGraphComponent
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
