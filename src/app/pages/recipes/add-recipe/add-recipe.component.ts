import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Collection } from 'src/app/models/collection.model';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent implements OnInit {
  value1 = 20;

  collections: Collection[];

  constructor(private toastService: ToastService, private collectionService: CollectionService) {
    this.collectionService.getCollections().subscribe({
      next: (collections) => {
        this.collections = collections;
      }
    })
  }

  ngOnInit(): void {
     
  }

  onUpload(e: any) {
    // TODO: do something
  }

  createRecipe() {
    this.toastService.showSuccess("Success!", "New recipe has been created");
  }
}
