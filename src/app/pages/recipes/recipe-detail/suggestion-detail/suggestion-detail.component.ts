import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Delta } from 'quill/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { SuggestionDto } from 'src/app/dtos/suggestion.dto';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { SuggestionService } from 'src/app/services/suggestion.service';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrl: './suggestion-detail.component.scss'
})
export class SuggestionDetailComponent implements OnInit {
  suggestion: SuggestionDto;
  currentRecipe: Recipe;
  modifiedFields = [];

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private suggestionService: SuggestionService,
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute)
  {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: paramMap => {
        const suggestionId = parseInt(paramMap.get("suggestionId"));
        const recipeId = parseInt(paramMap.get("recipeId"));
  
        this.isLoadingSubject.next(true);
  
        forkJoin({
          suggestion: this.suggestionService.getSuggestionByIdWithChanges(suggestionId),
          recipe: this.recipeService.getRecipeById(recipeId)
        }).subscribe({
          next: ({ suggestion, recipe }) => {
            this.suggestion = suggestion;
            this.currentRecipe = recipe;
  
            this.modifiedFields = this.getModifiedFields(suggestion.recipeChanges);
            this.isLoadingSubject.next(false);
          },
          error: ({ error }) => {
            this.isLoadingSubject.next(false);
            console.error(error.title);
          }
        });
      }
    });
  }

  getModifiedFields(recipeChanges: Partial<Recipe>) {
    return Object.keys(recipeChanges).filter(key => 
      recipeChanges[key] != null && (key !== 'suggestionId' && key !== 'id')
    );
  }

  getRecipeFieldContent(recipe: Recipe | Partial<Recipe>, field: string) {
    if (field === 'instructions' || field === 'ingredients') {
      const ops = JSON.parse(recipe[field]).delta;
      return new Delta(ops);
    } else {
      return recipe[field].toString();
    }
  }
}
