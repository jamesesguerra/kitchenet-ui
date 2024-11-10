import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Collection } from 'src/app/models/collection.model';
import { Recipe } from 'src/app/models/recipe.model';
import { CollectionService } from 'src/app/services/collection.service';
import { FileService } from 'src/app/services/file.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { EditorComponent } from 'src/app/shared/editor/editor.component';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent implements OnInit {
  @ViewChildren(EditorComponent) editors!: QueryList<EditorComponent>;
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  recipeForm: FormGroup;
  collections: Collection[];
  fileToUpload: any;

  backLink = ['../'];

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private toastService: ToastService,
    private collectionService: CollectionService,
    private recipeService: RecipeService,
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();

    this.collectionService.getLoggedInUserCollections().subscribe({
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
    })
  }

  ngOnInit(): void {
    this.collectionService.getLoggedInUserCollections().subscribe({
      next: (collections) => {
        this.collections = collections;

        this.activatedRoute.queryParamMap.subscribe(params => {
          const collectionIdParam = params.get('collectionId');
          const collectionId = collectionIdParam ? +collectionIdParam : null;
          const collectionPreset = this.collections.find(c => c.id === collectionId);

          if (collectionId && collectionPreset) {
            this.backLink = ['/collections', collectionId.toString()];
            this.recipeForm.get('collection').setValue(collectionPreset);
          }
        });
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);
      }
    })

  }

  getEditorValues(): string[] {
    return this.editors.map(editor => {
      const delta = editor.quill.getContents();
      const htmlContent = editor.quill.getSemanticHTML();
      return JSON.stringify({ delta, htmlContent });
    })
  }

  onUpload(e: any) {
    const uploadedFiles = e.files;
    const file = uploadedFiles[0];
    this.fileToUpload = file;
  }

  onSubmit() {
    this.fileUpload.upload();
    
    if (this.fileToUpload != null) {
      this.isLoadingSubject.next(true);
      this.fileService.uploadFile(this.fileToUpload).subscribe({
        next: (result: any) => {
          this.addRecipe(result.uri);
        },
        error: (error) => {
          this.toastService.showError("Error", error);
        }
      })
    } else {
      this.toastService.showError("Error", "You must upload a cover image for your recipe.");
    }
  }

  private addRecipe(coverPictureUri: string) {
    const formValues = this.recipeForm.value;
    const editorValues = this.getEditorValues();

    const recipe: Recipe = {
      name: formValues.name,
      description: formValues.description,
      coverPicture: coverPictureUri,
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
        this.isLoadingSubject.next(false);
        this.toastService.showSuccess("Success!", "New recipe has been created");
        this.router.navigate(['/recipes', id]);
        this.recipeForm.reset();
      },
      error: ({ error }) => {
        this.isLoadingSubject.next(false);
        this.toastService.showError("Error", error.title);
      }
    })
  }
}
