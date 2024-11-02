import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { UserService } from './user.service';
import { Recipe } from '../models/recipe.model';
import { RecipeSummaryDto } from '../dtos/recipe-summary.dto';

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

  getRecipeSummariesByUserId() {
    return this.http.get<RecipeSummaryDto[]>(`${this.apiUrl}?userId=${this.currentUserId}`);
  }

  updateRecipe(id: number, recipe: Recipe) {
    return this.http.put(`${this.apiUrl}/${id}`, recipe);
  }

  patchRecipe(id: number, recipe: Partial<Recipe>) {
    return this.http.patch(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipeByIds(ids: number[]) {
    const params = ids.join(',');
    return this.http.delete(`${this.apiUrl}?ids=${params}`);
  }
}
