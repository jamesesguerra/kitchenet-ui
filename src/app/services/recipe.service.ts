import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { UserService } from './user.service';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = `${env.baseApiUrl}/api/recipes`;
  currentUserId: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.currentUserId = this.userService.getUserId();
  }

  addRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(`${this.apiUrl}`, recipe);
  }

  getRecipeById(id: number) {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }
}
