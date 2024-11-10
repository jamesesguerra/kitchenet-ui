import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService, private userService: UserService) { }

    ngOnInit() {
        this.userService.getUser().subscribe(user => {
            if (user) {
                this.model = [
                    {
                        items: [
                            { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
                            { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ['/profile', user.id] },
                            { label: 'Collections', icon: 'pi pi-fw pi-folder-open', routerLink: ['/collections'] },
                            { label: 'Recipes', icon: 'pi pi-fw pi-book', routerLink: ['/recipes'] },
        
                        ]
                    }
                ];
            }
        });
    }
}
