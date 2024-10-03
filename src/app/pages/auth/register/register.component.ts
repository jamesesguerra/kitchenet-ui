import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService) { }
}
