import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss'
})
export class LandingComponent {
    constructor(
        private auth: AuthService,
        public layoutService: LayoutService,
        public router: Router) { }
    
    handleLogin() {
        this.auth.loginWithRedirect({
            appState: {
              target: '/home',
            },
        });
    }

    handleRegister() {
        this.auth.loginWithRedirect({
            appState: {
              target: '/home',
            },
            authorizationParams: {
              screen_hint: 'signup',
            },
        });
    }
}
