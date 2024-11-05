import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { UserService } from './user.service';
import { SuggestionComment } from '../models/suggestion-comment.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestionCommentService {
  private apiUrl = `${env.baseApiUrl}/api/suggestionComments`;
  currentUserId: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.getUserId().subscribe({
      next: (id) => {
        this.currentUserId = id;
      }
    })
  }

  getRecipeReviewsByUserId(id: number) {
    return this.http.get<SuggestionComment[]>(`${this.apiUrl}?suggestionId=${id}`);
  }

  addRecipeReview(recipeReview: SuggestionComment) {
    recipeReview.createdBy = this.currentUserId;
    return this.http.post<SuggestionComment>(this.apiUrl, recipeReview);
  }
}
