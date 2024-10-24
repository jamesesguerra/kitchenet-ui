import { NgModule } from '@angular/core';

import { CallbackRoutingModule } from './callback-routing.module';
import { CallbackComponent } from './callback.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    CallbackComponent
  ],
  imports: [
    CallbackRoutingModule,
    ProgressSpinnerModule
  ]
})
export class CallbackModule { }
