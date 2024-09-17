import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
    AvatarModule,
    CommonModule,
    FormsModule,
    DividerModule,
    MenuModule,
    StyleClassModule,
    ImageModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TabViewModule,
    ProfileRoutingModule,
    SharedModule
],
    declarations: [ProfileComponent]
})
export class ProfileModule {}