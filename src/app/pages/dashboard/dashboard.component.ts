import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    recipes: any = [];

    private isLoadingSubject: BehaviorSubject<boolean>;
    isLoading$: Observable<boolean>;

    constructor(private recipeService: RecipeService) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    ngOnInit() {
        this.isLoadingSubject.next(true);
        this.recipeService.getRandomRecipes().subscribe({
            next: (recipes) => {
                this.isLoadingSubject.next(false);
                this.recipes = recipes;
                console.log(this.recipes);
            }
        })
    }

}
