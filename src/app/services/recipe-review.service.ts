import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { UserService } from './user.service';
import { RecipeReview } from '../models/recipe-review.model';
import { filter, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeReviewService {
  private apiUrl = `${env.baseApiUrl}/api/recipeReviews`;

  constructor(private http: HttpClient, private userService: UserService) { }

  getRecipeReviewsByRecipeId(id: number) {
    return this.http.get<RecipeReview[]>(`${this.apiUrl}?recipeId=${id}`);
  }

  addRecipeReview(recipeReview: RecipeReview) {
    return this.userService.getUserId().pipe(
      filter(id => !!id),
      switchMap(id => {
        recipeReview.createdBy = id;
        return this.http.post<RecipeReview>(this.apiUrl, recipeReview);
      })
    );
  }

  getAverageRecipeRating(id: number) {
    return this.http.get<number>(`${this.apiUrl}/${id}/average-rating`);
  }
}
