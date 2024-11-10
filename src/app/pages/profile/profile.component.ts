import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Collection } from 'src/app/models/collection.model';
import { User } from 'src/app/models/user.model';
import { CollectionService } from 'src/app/services/collection.service';
import { FileService } from 'src/app/services/file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit { 
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  user: User;
  userId: string;
  items: MenuItem[] = [
    { label: 'Edit Profile', icon: 'pi pi-fw pi-pencil' }
  ];
  collections: Collection[] = [];
  isModalVisible = false;
  fileToUpload: any;

  userPictureForUpdate = '';
  private readonly DEFAULT_PICTURE = 'https://www.gravatar.com/avatar/?d=mp&s=200';

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
    private fileService: FileService,
    public userService: UserService)
  {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit() {
    this.isLoadingSubject.next(true);
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get("userId");
    
      this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user;
        this.userPictureForUpdate = user.picture;
        this.profileForm.setValue({
          name: user.nickname,
          bio: user.bio
        });
    
        this.collectionService.getCollectionsByUserId(user.id, true).subscribe(collections => {
          this.collections = collections;
        });

        this.isLoadingSubject.next(false);
      });
    });
  }

  showModal() {
    this.isModalVisible = true;
  }

  onCancel() {
    this.isModalVisible = false;
    this.userPictureForUpdate = this.user.picture;
  }

  onUpload(e: any) {
    const uploadedFiles = e.files;
    const file = uploadedFiles[0];
    this.fileToUpload = file;
  }

  onRemovePicture() {
    this.userPictureForUpdate = this.DEFAULT_PICTURE;
  }

  onSubmit() {
    this.isLoadingSubject.next(true);
    this.fileUpload.upload();

    if (this.fileToUpload != null) {
      this.fileService.uploadFile(this.fileToUpload).subscribe({
        next: (result: any) => {
          this.updateUserProfile(result.uri);
          this.fileUpload.clear();
        },
        error: (error) => {
          this.toastService.showError("Error", error);
        }
      });
    } else {
      this.updateUserProfile();
    }
  }

  private updateUserProfile(profilePictureUri?: string) {
    const formValues = this.profileForm.value;
    const user: User = {
      id: this.user.id,
      nickname: formValues.name,
      bio: formValues.bio,
      picture: profilePictureUri ?? this.userPictureForUpdate
    };

    this.userService.patchUser(this.user.id, user).subscribe({
      next: () => {
        this.isLoadingSubject.next(false);
        this.isModalVisible = false;
        this.toastService.showSuccess("Success!", "Your profile has been updated");

        this.userService.getUserById(this.userId).subscribe(user => {
          this.user = user;
          this.userPictureForUpdate = user.picture;
        });
      },
      error: ({ error }) => {
        this.isLoadingSubject.next(false);
        this.toastService.showSuccess("Error", error.title);
      }
    })
  }
}
