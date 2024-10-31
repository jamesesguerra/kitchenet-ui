import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionDto } from 'src/app/dtos/collection.dto';
import { ToastService } from 'src/app/layout/service/toast.service';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss'
})
export class CollectionDetailComponent implements OnInit {
  collection: CollectionDto;
  addItems: MenuItem[] = [
    { label: 'Add Recipe' }
  ];

  menuItems: MenuItem[] = [
    { 
      label: 'Add Recipe',
      icon: 'pi pi-plus',
      command: () => {
        this.router.navigate(['/recipes', 'add']);
      }
    },
    { label: 'Edit Collection', icon: 'pi pi-pencil' },
    {
      label: 'Delete Collection',
      icon: 'pi pi-trash',
      command: () => {
        this.confirmDelete()
      }
    }
  ]

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private collectionService: CollectionService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private router: Router) {
      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
      this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe({
        next: paramMap => {
          const collectionId = paramMap.get("id");

          this.isLoadingSubject.next(true);
          this.collectionService.getCollectionByIdWithRecipes(collectionId).subscribe({
            next: collection => {
              this.collection = collection;

              if (collection.recipes.length == 0) {
                setTimeout(() => {
                  this.isLoadingSubject.next(false);
                }, 250);
              } else {
                this.isLoadingSubject.next(false);
              }

            }
          })
        }
      })
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this collection?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      defaultFocus: "none",

      accept: () => {
        this.collectionService.deleteCollection(this.collection.id).subscribe({
          next: () => {
              this.router.navigate(['/collections'], { replaceUrl: true });
              this.toastService.showInfo('Confirmed', 'Collection deleted');
            },
            error: ({ error }) => {
              this.toastService.showError("Error", error.title);
            }
          });
      }
    });
  }
}
