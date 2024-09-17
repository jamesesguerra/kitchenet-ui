import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Collection } from 'src/app/models/collection.model';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent { 
  items!: MenuItem[];
  collections!: Collection[];
  isModalVisible = false;

  constructor(private collectionService: CollectionService) {
    this.items = [
      { label: 'Edit Profile', icon: 'pi pi-fw pi-pencil' }
    ];

    this.collectionService.getCollections().then(collections => {
      this.collections = collections;
    });
  }

  showModal() {
    this.isModalVisible = true;
  }
}
