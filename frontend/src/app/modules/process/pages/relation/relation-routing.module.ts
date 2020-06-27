import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { RelationsComponent } from './relations/relations.component';
import { EditRelationComponent } from './edit-relation/edit-relation.component';
import { CreateRelationComponent } from './create-relation/create-relation.component';


const routes: Routes = [


{
    path: 'relation',
    redirectTo: '',
    pathMatch: 'full'
},


  {
    path: '',
    children: [
       {
            path: '',
            component: RelationsComponent
        },
      {
        path: 'add',
        component: CreateRelationComponent
      },
      {
        path: 'edit',
        component: EditRelationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationRoutingModule { }
