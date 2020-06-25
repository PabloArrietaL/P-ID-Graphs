import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessesComponent } from './pages/processes/processes.component';
import { EditProcessComponent } from './pages/edit-process/edit-process.component';
import { CreateProcessComponent } from './pages/create-process/create-process.component';


const routes: Routes = [{


  path: '',
  component: ProcessesComponent,
  children: [
    {
      path: 'add',
      component: CreateProcessComponent
    },
    {
      path: 'edit',
      component: EditProcessComponent
    },
    {
      path: 'details',
        loadChildren: () =>
          import('./pages/relation/relation.module').then(
            (m) => m.RelationModule
          )
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
