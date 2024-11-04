import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { ToastService } from 'src/app/layout/service/toast.service';
import { RecipeReview } from 'src/app/models/recipe-review.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeReviewService } from 'src/app/services/recipe-review.service';

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

  reviewForm: FormGroup;
  reviews: RecipeReview[] = [];

  constructor(private reviewService: RecipeReviewService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.initForm();

    this.resizeSubscription = fromEvent(window, 'resize')
    .subscribe((event: Event) => {
      const width = window.innerWidth;

      this.screenSize = width < 645 ? 'sm' : 'md';
    });

    this.ingredients = JSON.parse(this.recipe.ingredients).htmlContent;
    this.instructions = JSON.parse(this.recipe.instructions).htmlContent;

    this.refreshReviews();
  }

  initForm() {
    this.reviewForm = new FormGroup({
      rating: new FormControl(0, [Validators.required, Validators.min(1)]),
      review: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    const formValues = this.reviewForm.value;

    const review = {
      recipeId: this.recipe.id,
      rating: formValues.rating,
      content: formValues.review,
    }

    this.reviewService.addRecipeReview(review).subscribe({
      next: () => {
        this.refreshReviews();
        this.toastService.showSuccess("Success!", "Your review has been added");
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);
      }
    })

    this.reviewForm.reset();
  }

  private refreshReviews() {
    this.reviewService.getRecipeReviewsByUserId(this.recipe.id).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
