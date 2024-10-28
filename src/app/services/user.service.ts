import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    currentUser = new BehaviorSubject<User>(null);

    constructor(private auth: AuthService) {
        this.auth.user$.subscribe(user => {
            this.currentUser.next(user);
        })
    }
}
