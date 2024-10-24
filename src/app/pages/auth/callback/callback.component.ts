import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.auth.handleRedirectCallback().subscribe({
        next: (result) => {
          const target = result.appState?.target || '/home';
          this.router.navigate([target]);
        },
        error: (err) => {
          console.error('Error handling redirect callback', err);
        }
      });
  }
}
