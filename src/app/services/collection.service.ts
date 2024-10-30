import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collection } from '../models/collection.model';
import { UserService } from './user.service';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = `${env.baseApiUrl}/api/collections`;
  currentUserId: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.currentUserId = this.userService.getUserId();
  }

  getCollections() {
    return this.http.get<Collection[]>(`${this.apiUrl}?UserId=${this.currentUserId}`);
  }

  addCollection(collection: Collection) {
    collection.userId = this.currentUserId;
    return this.http.post<Collection>(`${this.apiUrl}`, collection);
  }

  deleteCollection(collectionId) {
    return this.http.delete(`${this.apiUrl}/${collectionId}`);
  }
}
