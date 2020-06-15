import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ContentLayoutComponent } from './layout/modules/content-layout/content-layout.component';
import { HomeLayoutComponent } from './layout/modules/home-layout/home-layout.component';
import { ElementsComponent } from '@app/components/elements_module/elements/elements.component';
import { ProcessesComponent } from '@app/components/processes_module/processes/processes.component';
import { RelationsComponent } from '@app/components/relation_module/relations/relations.component';
import { ViewProcessComponent } from '@app/components/processes_module/view-process/view-process.component';

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
        path: 'elements',
        component: ElementsComponent
      },
      {
        path: 'processes',
        component: ProcessesComponent
      },
      {
        path: 'relations',
        component: RelationsComponent
      }
    ]
  },
  {
    path: 'process/:id',
    component: ViewProcessComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
