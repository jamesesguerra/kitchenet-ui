import { Component } from '@angular/core';
import { RecipeSummaryDto } from 'src/app/dtos/recipe-summary.dto';
import { ToastService } from 'src/app/layout/service/toast.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
    sortOptions = [
        { name: "Default", code: "Default" },
        { name: "Date", code: "Date" },
        { name: "Name", code: "Name" },
        { name: "Rating", code: "Rating" },
    ];

    sortOption = this.sortOptions[0];

    searchTerm = '';
    recipes: RecipeSummaryDto[] = [];
    filteredRecipes: RecipeSummaryDto[] = [];

    constructor(
        private recipeService: RecipeService,
        private toastService: ToastService)
    { }

    ngOnInit() {
        this.recipeService.getRecipeSummariesByUserId().subscribe({
            next: (recipes) => {
                this.recipes = recipes;
                this.filteredRecipes = recipes;
            },
            error: ({ error }) => {
                this.toastService.showError("Error", error.title);
            }
        })
    }

    filterCollections() {
        this.filteredRecipes = this.recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );

        if (this.sortOption.name === 'Default') return;

        if (this.sortOption.name === 'Name') {
            this.filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.sortOption.name === 'Date') {
            this.filteredRecipes.sort((a, b) => {
                return a.createdAt.getTime() - b.createdAt.getTime();
            });
        }
    }
}
