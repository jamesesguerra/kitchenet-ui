import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Collection } from 'src/app/models/collection.model';
import { Recipe } from 'src/app/models/recipe.model';
import { CollectionService } from 'src/app/services/collection.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { EditorComponent } from 'src/app/shared/editor/editor.component';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss'
})
export class EditRecipeComponent implements OnInit {
  @ViewChildren(EditorComponent) editors!: QueryList<EditorComponent>;

  recipeForm: FormGroup;

  recipe: Recipe;
  ingredients = '';
  instructions = '';
  collections: Collection[];

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private collectionService: CollectionService,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private router: Router)
  {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();

    this.initForm();
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(paramMap => {
        const recipeId = parseInt(paramMap.get("id"), 10);
        this.isLoadingSubject.next(true);
        
        return this.recipeService.getRecipeById(recipeId).pipe(
          tap(() => this.isLoadingSubject.next(false)),
          switchMap(recipe => {
            this.recipe = recipe;
            return this.collectionService.getCollections();
          })
        );
      })
    ).subscribe({
      next: (collections) => {
        this.collections = collections; 
        this.setFormValues();
      },
      error: ({ error }) => {
        this.isLoadingSubject.next(false);
        this.toastService.showError('Error', error.title);
      }
    });
  }

  initForm() {
    this.recipeForm = new FormGroup({
      collection: new FormControl(1, Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
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
    const selectedCollection = this.collections.find(c => c.id === this.recipe.collectionId);
    this.recipeForm.get('collection')?.setValue(selectedCollection);

    this.ingredients = JSON.parse(this.recipe.ingredients).htmlContent;
    this.instructions = JSON.parse(this.recipe.instructions).htmlContent;

    this.recipeForm.setValue({
      collection: selectedCollection,
      name: this.recipe.name,
      description: this.recipe.description,
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
    const formValues = this.recipeForm.value;
    const editorValues = this.getEditorValues();

    const recipe: Recipe = {
      id: this.recipe.id,
      name: formValues.name,
      description: formValues.description,
      coverPicture: formValues.coverPicture,
      prepTime: formValues.prepTime,
      cookTime: formValues.cookTime,
      servings: formValues.servings,
      calories: formValues.calories,
      protein: formValues.protein,
      fiber: formValues.fiber,
      fat: formValues.fat,
      carbohydrates: formValues.carbohydrates,
    }

    recipe.collectionId = formValues.collection.id;
    recipe.ingredients = editorValues[0];
    recipe.instructions = editorValues[1];

    this.recipeService.updateRecipe(this.recipe.id, recipe).subscribe({
      next: () => {
        this.toastService.showSuccess("Success!", "Your recipe has been updated");
        this.router.navigate(['/recipes', this.recipe.id]);
        this.recipeForm.reset();
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);
      }
    })
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this recipe?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      defaultFocus: "none",

      accept: () => {
        this.recipeService.deleteRecipeByIds([this.recipe.id]).subscribe({
          next: () => {
              this.router.navigate(['/recipes'], { replaceUrl: true });
              this.toastService.showInfo('Confirmed', 'Recipe deleted');
            },
            error: ({ error }) => {
              this.toastService.showError("Error", error.title);
            }
          });
      }
    });
  }
}
