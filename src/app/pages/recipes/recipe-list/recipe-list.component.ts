import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

    private isLoadingSubject: BehaviorSubject<boolean>;
    isLoading$: Observable<boolean>;

    constructor(
        private recipeService: RecipeService,
        private toastService: ToastService)
    {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    ngOnInit() {
        this.isLoadingSubject.next(true);
        this.recipeService.getRecipeSummariesByUserId().subscribe({
            next: (recipes) => {
                this.isLoadingSubject.next(false);
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
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            });
        } else if (this.sortOption.name === 'Rating') {
            this.filteredRecipes.sort((a, b) => {
                if (a.averageRating !== undefined && b.averageRating !== undefined) {
                    return b.averageRating - a.averageRating;
                  }
                  if (a.averageRating === undefined) return 1;
                  if (b.averageRating === undefined) return -1;
                  return 0;
            })
        }
    }

    counterArray(n: number): any[] {
        return Array(n);
    }
}
