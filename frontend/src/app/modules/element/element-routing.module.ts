import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElementsComponent } from './pages/elements/elements.component';
import { EditElementComponent } from './pages/edit-element/edit-element.component';
import { CreateElementComponent } from './pages/create-element/create-element.component';
import { DetailsElementComponent } from './pages/details-element/details-element.component';


const routes: Routes = [{
  path: 'element',
  redirectTo: '',
  pathMatch: 'full'
},
{
  path: '',
  children: [
    {
      path: '',
      component: ElementsComponent
    },
    {
      path: 'add',
      component: CreateElementComponent
    },
    {
      path: 'edit',
      component: EditElementComponent
    },
    {
      path: 'details',
      component: DetailsElementComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementRoutingModule { }
