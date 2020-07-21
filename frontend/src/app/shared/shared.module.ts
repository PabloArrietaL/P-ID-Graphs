import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from '@iplab/ngx-file-upload';

// Modules
import { MaterialModule } from './material.module';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(options),
    DeviceDetectorModule.forRoot(),
    ToastrModule.forRoot()
  ],
  exports: [
    NgbModule,
    MaterialModule,
    NgxMaskModule,
    DeviceDetectorModule,
    ToastrModule,
    FileUploadModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
