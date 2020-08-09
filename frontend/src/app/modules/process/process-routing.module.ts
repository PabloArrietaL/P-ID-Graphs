import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessesComponent } from './pages/processes/processes.component';
import { EditProcessComponent } from './pages/edit-process/edit-process.component';
import { CreateProcessComponent } from './pages/create-process/create-process.component';
import { RelationsComponent } from './pages/relation/relations/relations.component';
import { AddElementComponent } from './pages/add-element/add-element.component';
import { ProcessDetailComponent } from './pages/process-detail/process-detail.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { AddPermissiveRelationshipComponent } from './pages/add-permissive-relationship/add-permissive-relationship.component';


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
      path: 'tabs',
      component: TabsComponent,
    },
          {
      path: 'add-permissive-relationship',
      component: AddPermissiveRelationshipComponent
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
