import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.scss'
})
export class SuggestionListComponent {
  suggestions = [
    {
      id: 1,
      title: "Change this to that"
    }
  ]
}
