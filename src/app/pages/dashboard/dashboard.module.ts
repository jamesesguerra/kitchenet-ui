import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { PostComponent } from './post/post.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { ImageModule } from 'primeng/image';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';

@NgModule({
    imports: [
        AvatarModule,
        CommonModule,
        FormsModule,
        DividerModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ImageModule,
        ButtonModule,
        DashboardsRoutingModule
    ],
    declarations: [DashboardComponent, PostComponent]
})
export class DashboardModule { }
