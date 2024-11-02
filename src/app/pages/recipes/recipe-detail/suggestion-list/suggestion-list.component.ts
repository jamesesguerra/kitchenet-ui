import { Component, Input, OnInit } from '@angular/core';
import { SuggestionService } from 'src/app/services/suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.scss'
})
export class SuggestionListComponent implements OnInit {
  @Input({ required: true }) recipeId!: number;

  suggestions = [];

  constructor(private suggestionService: SuggestionService) { }
  
  ngOnInit(): void {
    this.suggestionService.getSuggestionsByRecipeId(this.recipeId).subscribe({
      next: (suggestions) => {
        this.suggestions = suggestions;
      }
    })
  }
}
