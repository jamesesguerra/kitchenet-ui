import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Delta } from 'quill/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { SuggestionDto } from 'src/app/dtos/suggestion.dto';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Recipe } from 'src/app/models/recipe.model';
import { SuggestionComment } from 'src/app/models/suggestion-comment.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { SuggestionCommentService } from 'src/app/services/suggestion-comment.service';
import { SuggestionService } from 'src/app/services/suggestion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrl: './suggestion-detail.component.scss'
})
export class SuggestionDetailComponent implements OnInit {
  suggestion: SuggestionDto;
  currentRecipe: Recipe;
  modifiedFields = [];
  comments: SuggestionComment[] = [];
  newComment = '';
  userPicture: any;
 
  items = [];

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    public userService: UserService,
    private suggestionService: SuggestionService,
    private toastService: ToastService,
    private recipeService: RecipeService,
    private commentService: SuggestionCommentService,
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

            this.refreshComments();
            this.modifiedFields = this.getModifiedFields(suggestion.recipeChanges);
            this.setSuggestionActions();
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

  onSubmit() {
    const comment = { suggestionId: this.suggestion.id, content: this.newComment };
    this.commentService.addRecipeReview(comment).subscribe({
      next: () => {
        this.newComment = '';
        this.refreshComments();
        this.toastService.showSuccess("Success!", "Your comment has been added");
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);
      }
    })
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

  private refreshComments() {
    this.commentService.getRecipeReviewsByUserId(this.suggestion.id).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.isLoadingSubject.next(false);
      }
    })
  }
}
