import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { BehaviorSubject, map } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = `${env.baseApiUrl}/api/users`;
    user = new BehaviorSubject<User>(null);

    constructor(private auth: AuthService, private http: HttpClient) { }

    initUser() {
        this.auth.user$.subscribe(user => {
            this.getUserById(user.sub).subscribe({
                next: (dbUser) => {
                    this.user.next(dbUser);
                }
            })
        })
    }

    getUserById(id: string) {
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }

    getUserId() {
        return this.user.asObservable().pipe(
            map(user => user ? user.id : null)
        );
    }

    getUserPicture() {
        const user = this.user.getValue();
        return user ? user.picture : null;
    }
}
