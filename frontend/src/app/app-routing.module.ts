import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ContentLayoutComponent } from './layout/modules/content-layout/content-layout.component';
import { HomeLayoutComponent } from './layout/modules/home-layout/home-layout.component';


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
        path: 'element',
        loadChildren: () =>
          import('@module/element/element.module').then(
            (m) => m.ElementModule
          )
      },
      {
        path: 'process',
        loadChildren: () =>
          import('@module/process/process.module').then(
            (m) => m.ProcessModule
          )
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
