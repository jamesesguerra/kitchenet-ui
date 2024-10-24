import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../service/app.layout.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    items!: MenuItem[];
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    private doc = inject(DOCUMENT)

    constructor(public layoutService: LayoutService, private auth: AuthService) { }

    handleLogout() {
        this.auth.logout({
            logoutParams: {
              returnTo: `${this.doc.location.origin}/landing`,
            },
        });
    }
}
