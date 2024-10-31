import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Delta } from 'quill/core';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Collection } from 'src/app/models/collection.model';
import { Recipe } from 'src/app/models/recipe.model';
import { CollectionService } from 'src/app/services/collection.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { EditorComponent } from 'src/app/shared/editor/editor.component';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent implements OnInit {
  @ViewChildren(EditorComponent) editors!: QueryList<EditorComponent>;

  value1 = 20;
  recipeForm: FormGroup;

  collections: Collection[];
  selectedCollection: Collection;

  constructor(
    private toastService: ToastService,
    private collectionService: CollectionService,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.collectionService.getCollections().subscribe({
      next: (collections) => {
        this.collections = collections;
      }
    })

    this.initForm();
  }

  initForm() {
    this.recipeForm = new FormGroup({
      collection: new FormControl(null, Validators.required),
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

  ngOnInit(): void {
     
  }

  getEditorValues(): string[] {
    return this.editors.map(editor => {
      const delta = editor.quill.getContents();
      const htmlContent = editor.quill.getSemanticHTML();
      return JSON.stringify({ delta, htmlContent });
    })
  }

  onUpload(e: any) {
    // TODO: do something
  }

  onSubmit() {
    const formValues = this.recipeForm.value;
    const editorValues = this.getEditorValues();

    const recipe: Recipe = {
      id: formValues.id,
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

    this.recipeService.addRecipe(recipe).subscribe({
      next: ({ id }) => {
        this.toastService.showSuccess("Success!", "New recipe has been created");
        this.router.navigate(['/recipes', id]);
        this.recipeForm.reset();
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);
      }
    })
  }

}
