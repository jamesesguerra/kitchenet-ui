import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { UserService } from './user.service';
import { SuggestionComment } from '../models/suggestion-comment.model';
import { filter, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionCommentService {
  private apiUrl = `${env.baseApiUrl}/api/suggestionComments`;

  constructor(private http: HttpClient, private userService: UserService) { }

  getRecipeReviewsByUserId(id: number) {
    return this.http.get<SuggestionComment[]>(`${this.apiUrl}?suggestionId=${id}`);
  }

  addRecipeReview(suggestionComment: SuggestionComment) {
    return this.userService.getUserId().pipe(
      filter(id => !!id),
      switchMap(id => {
        suggestionComment.createdBy = id;
        return this.http.post<SuggestionComment>(this.apiUrl, suggestionComment);
      })
    );
  }
}
