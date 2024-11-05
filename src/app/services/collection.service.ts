import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collection } from '../models/collection.model';
import { UserService } from './user.service';
import { environment as env } from 'src/environments/environment';
import { CollectionDto } from '../dtos/collection.dto';
import { filter, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = `${env.baseApiUrl}/api/collections`;

  constructor(private http: HttpClient, private userService: UserService) { }

  getCollections(isVisible?: boolean) {
    return this.userService.getUserId().pipe(
      filter(id => !!id),
      switchMap(id => {
        let url = `${this.apiUrl}?UserId=${id}`;
        if (isVisible) url += `&isVisible=${isVisible}`;
        return this.http.get<Collection[]>(url);
      })
    );
  }

  addCollection(collection: Collection) {
    return this.userService.getUserId().pipe(
      filter(id => !!id),
      switchMap(id => {
        collection.userId = id;
        return this.http.post<Collection>(`${this.apiUrl}`, collection);
      })
    );
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
