import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/layout/service/toast.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent implements OnInit {
  value1 = 20;

  collections = [
    { name: "Breakfast Recipes", code: "BR" },
    { name: "Lunch Recipes", code: "LR" },
    { name: "Dinner Recipes", code: "DR" },
  ]

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
     
  }

  onUpload(e: any) {
    // TODO: do something
  }

  createRecipe() {
    this.toastService.showSuccess("Success!", "New recipe has been created");
  }
}
