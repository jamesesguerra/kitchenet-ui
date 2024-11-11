import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionDto } from 'src/app/dtos/collection.dto';
import { CollectionService } from 'src/app/services/collection.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    recipes: any = [];
    collections: CollectionDto[] = [];

    private isLoadingSubject: BehaviorSubject<boolean>;
    isLoading$: Observable<boolean>;

    constructor(private recipeService: RecipeService, private collectionService: CollectionService) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();
    }

    ngOnInit() {
        this.isLoadingSubject.next(true);
        this.recipeService.getRandomRecipes().subscribe({
            next: (recipes) => {
                this.isLoadingSubject.next(false);
                this.recipes = recipes;
            }
        });

        this.collectionService.getRecentCollections().subscribe({
            next: (collections) => {
                this.collections = collections;
            }
        })
    }

    counterArray(n: number): any[] {
        return Array(n);
    }
}
