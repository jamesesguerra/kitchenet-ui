import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { inject } from '@vercel/analytics';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        inject();
        this.primengConfig.ripple = true;
    }
}
