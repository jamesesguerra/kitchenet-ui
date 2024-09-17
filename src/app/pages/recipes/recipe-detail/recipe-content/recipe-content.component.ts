import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-content',
  templateUrl: './recipe-content.component.html',
  styleUrl: './recipe-content.component.scss'
})
export class RecipeContentComponent {
  rating = 5;
  value = 0;
}
