import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    user = new BehaviorSubject<User>(null);

    constructor(private auth: AuthService) { }

    initUser() {
        this.auth.user$.subscribe(user => {
            this.user.next(user);
        })
    }

    getUserId() {
        const user = this.user.getValue();
        return user ? user.sub : null;
    }

}
