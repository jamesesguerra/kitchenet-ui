import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AppMenuComponent } from './components/app-menu/app.menu.component';
import { AppMenuitemComponent } from './components/app-menuitem/app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './components/app-topbar/app.topbar.component';
import { AppFooterComponent } from './components/app-footer/app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from './components/app-sidebar/app.sidebar.component';
import { AppTitleComponent } from './components/app-title/app-title.component';
import { AppLayoutComponent } from "./app.layout.component";
import { ToastComponent } from './components/toast/toast.component';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        ToastComponent,
        AppTitleComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        ToastModule,
        AppConfigModule
    ],
    exports: [AppLayoutComponent, AppTopBarComponent],
    providers: [MessageService]
})
export class AppLayoutModule { }
