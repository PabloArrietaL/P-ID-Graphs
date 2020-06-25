import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CollapseModule.forRoot()
  ],
  exports: [CollapseModule],
  providers: []
})
export class CoreModule {}
