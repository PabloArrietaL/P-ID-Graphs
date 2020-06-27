import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusComponent } from './pages/status/status.component';
import { CreateStatusComponent } from './pages/create-status/create-status.component';
import { EditStatusComponent } from './pages/edit-status/edit-status.component';


const routes: Routes = [{
    path: 'status',
    redirectTo: '',
    pathMatch: 'full'
},


  {
    path: '',
    children: [
       {
            path: '',
            component: StatusComponent
        },
      {
        path: 'add',
        component: CreateStatusComponent
      },
  
      {
        path: 'edit',
        component: EditStatusComponent
      }
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRoutingModule { }
