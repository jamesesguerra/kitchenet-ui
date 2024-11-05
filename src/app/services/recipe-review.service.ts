import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { UserService } from './user.service';
import { RecipeReview } from '../models/recipe-review.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeReviewService {
  private apiUrl = `${env.baseApiUrl}/api/recipeReviews`;
  currentUserId: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.getUserId().subscribe({
      next: (id) => {
        this.currentUserId = id;
      }
    })
  }

  getRecipeReviewsByRecipeId(id: number) {
    return this.http.get<RecipeReview[]>(`${this.apiUrl}?recipeId=${id}`);
  }

  addRecipeReview(recipeReview: RecipeReview) {
    recipeReview.createdBy = this.currentUserId;
    return this.http.post<RecipeReview>(this.apiUrl, recipeReview);
  }

  getAverageRecipeRating(id: number) {
    return this.http.get<number>(`${this.apiUrl}/${id}/average-rating`);
  }
}
