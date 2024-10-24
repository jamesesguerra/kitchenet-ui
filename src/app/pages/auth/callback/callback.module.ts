import { NgModule } from '@angular/core';

import { CallbackRoutingModule } from './callback-routing.module';
import { CallbackComponent } from './callback.component';


@NgModule({
  declarations: [
    CallbackComponent
  ],
  imports: [
    CallbackRoutingModule
  ]
})
export class CallbackModule { }
