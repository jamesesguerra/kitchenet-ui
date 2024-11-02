import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SuggestionDto } from 'src/app/dtos/suggestion.dto';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { SuggestionService } from 'src/app/services/suggestion.service';
import { EditorComponent } from 'src/app/shared/editor/editor.component';

@Component({
  selector: 'app-add-suggestion',
  templateUrl: './add-suggestion.component.html',
  styleUrl: './add-suggestion.component.scss'
})
export class AddSuggestionComponent implements OnInit {
  @ViewChildren(EditorComponent) editors!: QueryList<EditorComponent>;

  suggestionForm: FormGroup;
  recipe: Recipe;
  ingredients = '';
  instructions = '';

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private suggestionService: SuggestionService,
    private toastService: ToastService,
    private router: Router)
  {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();

    this.initForm();
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: paramMap => {
        const recipeId = parseInt(paramMap.get("id"));

        this.isLoadingSubject.next(true);
        this.recipeService.getRecipeById(recipeId).subscribe({
          next: (recipe) => {
            this.isLoadingSubject.next(false);
            this.recipe = recipe;

            this.setFormValues();
          }
        })
      }
    })
  }

  initForm() {
    this.suggestionForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      recipeName: new FormControl('', Validators.required),
      recipeDescription: new FormControl('', Validators.required),
      servings: new FormControl(0, Validators.required),
      prepTime: new FormControl(0, Validators.required),
      cookTime: new FormControl(0, Validators.required),
      calories: new FormControl(0),
      protein: new FormControl(0),
      fat: new FormControl(0),
      fiber: new FormControl(0),
      carbohydrates: new FormControl(0),
      coverPicture: new FormControl('', Validators.required)
    })
  }

  setFormValues() {
    this.ingredients = JSON.parse(this.recipe.ingredients).htmlContent;
    this.instructions = JSON.parse(this.recipe.instructions).htmlContent;

    this.suggestionForm.patchValue({
      recipeName: this.recipe.name,
      recipeDescription: this.recipe.description,
      servings: this.recipe.servings,
      prepTime: this.recipe.prepTime,
      cookTime: this.recipe.cookTime,
      calories: this.recipe.calories,
      protein: this.recipe.protein,
      fat: this.recipe.fat,
      fiber: this.recipe.fiber,
      carbohydrates: this.recipe.carbohydrates,
      coverPicture: this.recipe.coverPicture
    });
  }

  getEditorValues(): string[] {
    return this.editors.map(editor => {
      const delta = editor.quill.getContents();
      const htmlContent = editor.quill.getSemanticHTML();
      return JSON.stringify({ delta, htmlContent });
    })
  }

  onSubmit() {
    const formValues = this.suggestionForm.value;
    const editorValues = this.getEditorValues();

    const modifiedRecipe: Recipe = {
      name: formValues.recipeName,
      description: formValues.recipeDescription,
      coverPicture: formValues.coverPicture,
      prepTime: formValues.prepTime,
      cookTime: formValues.cookTime,
      ingredients: editorValues[0],
      instructions: editorValues[1],
      servings: formValues.servings,
      calories: formValues.calories,
      protein: formValues.protein,
      fiber: formValues.fiber,
      fat: formValues.fat,
      carbohydrates: formValues.carbohydrates,
    }

    
    const changes = this.getChangedFields(this.recipe, modifiedRecipe);

    const suggestion: SuggestionDto = {
      recipeId: this.recipe.id,
      title: formValues.title,
      description: formValues.description,
      recipeChanges: changes
    }

    if (Object.keys(changes).length > 0) {
      this.suggestionService.addSuggestion(suggestion).subscribe({
        next: ({ id }) => {
          this.toastService.showSuccess("Success!", "New suggestion added");
          this.router.navigate([`/recipes/${this.recipe.id}/suggestions`, id]);
        },
        error: ({ error }) => {
          this.toastService.showError("Error", error.title);
        }
      })

    } else {
      this.toastService.showInfo("Nothing to save", "No changes were made to the recipe.")
    }
  }

  private getChangedFields(original: Recipe, modified: Recipe) {
    const changes: Partial<Recipe> = {};

    for (const key in original) {
      if (original.hasOwnProperty(key) && modified.hasOwnProperty(key)) {
        if (original[key] !== modified[key]) {
          changes[key] = modified[key];
        }
      }
    } 

    return changes;
  }
}
