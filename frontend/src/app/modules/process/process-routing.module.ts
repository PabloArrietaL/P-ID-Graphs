import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessesComponent } from './pages/processes/processes.component';
import { EditProcessComponent } from './pages/edit-process/edit-process.component';
import { CreateProcessComponent } from './pages/create-process/create-process.component';
import { RelationsComponent } from './pages/relation/relations/relations.component';
import { AddElementComponent } from './pages/add-element/add-element.component';


const routes: Routes = [

{
    path: 'process',
    redirectTo: '',
    pathMatch: 'full'
},


  {
    path: '',
    children: [
       {
            path: '',
            component: ProcessesComponent
        },
    {
      path: 'add',
      component: CreateProcessComponent
    },
    {
      path: 'edit',
      component: EditProcessComponent
    },
        {
      path: 'detail',
      component: AddElementComponent
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
