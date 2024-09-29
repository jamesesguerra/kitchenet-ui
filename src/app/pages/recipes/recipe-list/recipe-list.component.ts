import { Component } from '@angular/core';
import { Collection } from 'src/app/models/collection.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  isImageLoaded = false;
  isModalVisible = false;
  collections!: Collection[];
  typeFilter = 'Type';
  sortOption = ''

  typeOptions = [
    { name: "Public", code: "PB" },
    { name: "Private", code: "PV" },
  ];

  sortOptions = [
    { name: "Date", code: "PB" },
    { name: "Name", code: "PV" },
    { name: "Rating", code: "PV" },
  ];

  categories: any[] = [
    { name: 'Public', key: 'PB', icon: 'pi-unlock', description: 'Anyone on the internet can see this collection' },
    { name: 'Private', key: 'PV', icon: 'pi-lock', description: 'Only you can see this collection' }
  ];

  onImageLoad() {
    this.isImageLoaded = true;
    console.log("here")
  }
}
