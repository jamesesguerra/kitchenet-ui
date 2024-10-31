import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Collection } from 'src/app/models/collection.model';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.scss'
})
export class CollectionListComponent implements OnInit {
  isAddModalVisible = false;
  showMessage = false;
  collections: Collection[] = [];
  filteredCollections: Collection[] = [];
  searchTerm: string = '';
  visibilityFilter: { name: string, code: number };
  sortOption = ''

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  visibilityOptions = [
    { name: "All", code: 2 },
    { name: "Public", code: 1 },
    { name: "Private", code: 0 },
  ];

  sortOptions = [
    { name: "Date", code: "PB" },
    { name: "Name", code: "PV" }
  ];

  categories: any[] = [
    {
      name: 'Public',
      isVisible: true,
      key: 'PB',
      icon: 'pi-unlock',
      description: 'Anyone on the internet can see this collection'
    },
    {
      name: 'Private',
      isVisible: false,
      key: 'PV',
      icon: 'pi-lock',
      description: 'Only you can see this collection'
    }
  ];

  messages: Message[] = [{ severity: 'warn', detail: 'You are creating a public collection' }];

  collectionForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    description: new FormControl(''),
    isVisible: new FormControl(true)
  })

  constructor(
    private collectionService: CollectionService,
    private toastService: ToastService) {
      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
      this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.isLoadingSubject.next(true);

    this.collectionService.getCollections().subscribe({
      next: (result) => {
        this.collections = result;
        this.filteredCollections = result;
        this.isLoadingSubject.next(false);
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);
        this.isLoadingSubject.next(false);
      }
    });

    this.collectionForm.get("isVisible")?.valueChanges.subscribe(value => {
      const message = value
        ? { severity: 'warn', detail: 'You are creating a public collection' }
        : { severity: 'info', detail: 'You are creating a private collection' };
      this.messages = [message];
    })
  }

  filterCollections() {
    this.filteredCollections = this.collections.filter(collection => 
      collection.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.filteredCollections = this.filteredCollections.filter(collection => {
      if (!this.visibilityFilter.code) return collection.isVisible == false;
      if (this.visibilityFilter.code == 1) return collection.isVisible == true;
      return collection;
    })
  }

  showModal() {
    this.showMessage = true;
    this.isAddModalVisible = true;
  }

  hideAddModal() {
    this.showMessage = false;
    this.isAddModalVisible = false;
    this.collectionForm.reset({ isVisible: true });
  }

  saveCollection() {
    this.isAddModalVisible = false;
    this.toastService.showSuccess("Success!", "New collection has been saved");
  }

  onSubmit() {
    this.isAddModalVisible = false;

    const collection = this.collectionForm.value as Collection;
    this.collectionService.addCollection(collection).subscribe({
      next: (response) => {
        this.toastService.showSuccess("Success!", "Your new collection has been saved");
        this.filteredCollections = [...this.filteredCollections, response];
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);
      }
    })

    this.collectionForm.reset({ isVisible: true });
  }
}
