import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Delta } from 'quill/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { SuggestionDto } from 'src/app/dtos/suggestion.dto';
import { ToastService } from 'src/app/layout/service/toast.service';
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
 
  items = [];

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private suggestionService: SuggestionService,
    private toastService: ToastService,
    private recipeService: RecipeService,
    private router: Router,
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
            this.setSuggestionActions();
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

  private setSuggestionActions() {
    let actions = [];

    const extraActions = [
      {
        label: 'Accept',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.acceptSuggestion();
        }
      },
      {
        label: 'Close',
        icon: 'pi pi-sort-alt-slash'
      },
      { separator: true }
    ];

    const defaultActions = [
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.deleteSuggestion();
        }
      }
    ]

    if (this.suggestion.status === "Open") {
      actions = [...extraActions]
    }

    actions = [...actions, ...defaultActions];

    console.log(actions);

    this.items = [{
      label: 'Actions',
      items: actions
    }]
  }

  private acceptSuggestion() {
    forkJoin({
      suggestion: this.suggestionService.patchSuggestion(this.suggestion.id, { status: 'Merged' }),
      recipe: this.recipeService.patchRecipe(this.currentRecipe.id, this.suggestion.recipeChanges)
    }).subscribe({
      next: () => {
        this.router.navigate(['/recipes', this.currentRecipe.id])
        this.toastService.showSuccess("Success!", "Accepted suggestion changes");
      },
      error: ({ error }) => {
        this.isLoadingSubject.next(false);
        this.toastService.showError("Error", error.title);
      }
    });
  }

  private deleteSuggestion() {
    this.suggestionService.deleteSuggestion(this.suggestion.id).subscribe({
      next: () => {
        this.toastService.showSuccess("Success!", "Suggestion was deleted");
        this.router.navigate(['/recipes', this.currentRecipe.id]);
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);
      }
    })
  }
}
