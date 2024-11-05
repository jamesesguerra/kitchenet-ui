import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { UserService } from './user.service';
import { SuggestionDto } from '../dtos/suggestion.dto';
import { filter, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private apiUrl = `${env.baseApiUrl}/api/suggestions`;

  constructor(private http: HttpClient, private userService: UserService) { }

  addSuggestion(suggestion: SuggestionDto) {
    return this.userService.getUserId().pipe(
      filter(id => !!id),
      switchMap(id => {
        suggestion.createdBy = id;
        return this.http.post<SuggestionDto>(this.apiUrl, suggestion);
      })
    );
  }

  getSuggestionByIdWithChanges(id: number) {
    return this.http.get<SuggestionDto>(`${this.apiUrl}/${id}`);
  }

  getSuggestionsByRecipeId(id: number) {
    return this.http.get<SuggestionDto[]>(`${this.apiUrl}?recipeId=${id}`);
  }

  patchSuggestion(id: number, suggestion: Partial<SuggestionDto>) {
    return this.http.patch(`${this.apiUrl}/${id}`, suggestion);
  }

  deleteSuggestion(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
