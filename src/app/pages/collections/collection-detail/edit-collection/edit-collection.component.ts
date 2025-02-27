import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { CollectionDto } from 'src/app/dtos/collection.dto';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Collection } from 'src/app/models/collection.model';
import { Recipe } from 'src/app/models/recipe.model';
import { CollectionService } from 'src/app/services/collection.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrl: './edit-collection.component.scss'
})
export class EditCollectionComponent implements OnInit {
  @Input({ required: true }) items: Recipe[] = [];
  @Input({ required: true }) collection: Collection;
  @Output() save = new EventEmitter<CollectionDto>();
  @Output() cancel = new EventEmitter();

  allRecipes: Recipe[];
  collectionForm!: FormGroup;
  deletedRecipeIds = [];

  constructor(
    private collectionService: CollectionService,
    private toastService: ToastService,
    private recipeService: RecipeService){ }
    
  ngOnInit(): void {
    this.collectionForm = new FormGroup({
      name: new FormControl(this.collection.name, { validators: [Validators.required] }),
      description: new FormControl(this.collection.description)
    })

    this.allRecipes = this.items;
  }

  deleteRecipe(id: number) {
    this.deletedRecipeIds.push(id);
    this.items = this.items.filter(i => i.id !== id);
  }
    
  onSubmit() {
    const { name, description } = this.collectionForm.value as Collection;

    forkJoin({
      collection: this.collectionService.updateCollection(this.collection.id, name, description),
      recipe: this.deletedRecipeIds.length > 0 ?
              this.recipeService.deleteRecipeByIds(this.deletedRecipeIds) :
              of(null)
    }).subscribe({
      next: () => {
        this.toastService.showSuccess("Success!", "Your collection has been updated");
        this.save.emit({ id: this.collection.id, name, description, recipes: this.items })
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);

      }
    });
  }

  onCancel() {
    setTimeout(() => {
      this.items = this.allRecipes;
    }, 500);
    this.cancel.emit();
  }
}
