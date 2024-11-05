import { Component, Input, OnInit } from '@angular/core';
import { SuggestionService } from 'src/app/services/suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.scss'
})
export class SuggestionListComponent implements OnInit {
  @Input({ required: true }) recipeId!: number;

  searchTerm = '';

  suggestions = [];
  filteredSuggestions = [];

  constructor(private suggestionService: SuggestionService) { }
  
  ngOnInit(): void {
    this.suggestionService.getSuggestionsByRecipeId(this.recipeId).subscribe({
      next: (suggestions) => {
        this.suggestions = suggestions;
        this.filteredSuggestions = suggestions;
      }
    })
  }

  filterCollections() {
    this.filteredSuggestions = this.suggestions.filter(suggestion => 
      suggestion.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
