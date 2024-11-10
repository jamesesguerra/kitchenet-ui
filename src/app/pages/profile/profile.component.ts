import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from 'src/app/layout/service/toast.service';
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
  ];
  collections: Collection[] = [];
  isModalVisible = false;

  profileForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    bio: new FormControl('')
  });

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private toastService: ToastService,
    private collectionService: CollectionService,
    private activatedRoute: ActivatedRoute,
    public userService: UserService)
  {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const userId = paramMap.get("userId");
    
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
        this.profileForm.setValue({
          name: user.nickname,
          bio: user.bio
        });
    
        this.collectionService.getCollectionsByUserId(user.id, true).subscribe(collections => {
          this.collections = collections;
        });
      });
    });
  }

  showModal() {
    this.isModalVisible = true;
  }

  onSubmit() {
    const formValues = this.profileForm.value;
    const user: User = { id: this.user.id, nickname: formValues.name, bio: formValues.bio };

    this.userService.patchUser(this.user.id, user).subscribe({
      next: () => {
        this.userService.initUser();
        this.isModalVisible = false;
        this.toastService.showSuccess("Success!", "Your profile has been updated");
      }
    })
  }
}
