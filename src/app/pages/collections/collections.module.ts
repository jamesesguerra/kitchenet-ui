import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { ImageModule } from 'primeng/image';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CollectionsRoutingModule } from './collections-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { CollectionListComponent } from './collection-list/collection-list.component';

import { OrderListModule } from 'primeng/orderlist';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';

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
        InputTextModule,
        ImageModule,
        ButtonModule,
        ToolbarModule,
        OrderListModule,
        DropdownModule,
        SharedModule,
        InputTextareaModule,
        RadioButtonModule,
        MessagesModule,
        CollectionsRoutingModule
    ],
    declarations: [CollectionListComponent]
})
export class CollectionsModule { }
