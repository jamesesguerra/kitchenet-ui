import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-content',
  templateUrl: './recipe-content.component.html',
  styleUrl: './recipe-content.component.scss',
  host: {
    '(resize)': 'onResize()'
  }
})
export class RecipeContentComponent implements OnInit, OnDestroy {
  @Input({ required: true }) recipe!: Recipe;
  ingredients = '';
  instructions = '';

  resizeSubscription!: Subscription;
  screenSize: 'sm' | 'md' = window.innerWidth < 645 ? 'sm' : 'md';
  rating = 5;
  value = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.resizeSubscription = fromEvent(window, 'resize')
    .subscribe((event: Event) => {
      const width = window.innerWidth;

      this.screenSize = width < 645 ? 'sm' : 'md';
    });

    this.ingredients = JSON.parse(this.recipe.ingredients).htmlContent;
    this.instructions = JSON.parse(this.recipe.instructions).htmlContent;

    console.log(this.ingredients);
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

}
