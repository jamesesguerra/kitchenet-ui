import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MenuItem } from 'primeng/api';
import { Collection } from 'src/app/models/collection.model';
import { User } from 'src/app/models/user.model';
import { CollectionService } from 'src/app/services/collection.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit { 
  user: User;
  items: MenuItem[] = [
    { label: 'Edit Profile', icon: 'pi pi-fw pi-pencil' }
  ];;
  collections: Collection[] = [];
  isModalVisible = false;

  constructor(private collectionService: CollectionService, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.user.subscribe(user => {
      this.user = user;
    })
  }

  showModal() {
    this.isModalVisible = true;
  }
}
