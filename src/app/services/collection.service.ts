import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collection } from '../models/collection.model';
import { UserService } from './user.service';
import { environment as env } from 'src/environments/environment';
import { CollectionDto } from '../dtos/collection.dto';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = `${env.baseApiUrl}/api/collections`;
  currentUserId: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.getUserId().subscribe({
      next: (id) => {
        this.currentUserId = id;
      }
    })
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

  getCollectionByIdWithRecipes(collectionId) {
    return this.http.get<CollectionDto>(`${this.apiUrl}/${collectionId}/recipes`);
  }

  updateCollection(id: number, name: string, description: string) {
    return this.http.patch(`${this.apiUrl}/${id}`, { name, description });
  }
}
