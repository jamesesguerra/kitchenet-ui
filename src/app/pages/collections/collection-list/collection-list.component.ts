import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message } from 'primeng/api';
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
  collections: Collection[];
  filteredCollections: Collection[];
  searchTerm: string = '';
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
    private toastService: ToastService,
    private confirmationService: ConfirmationService) {
      this.collectionService.getCollections().subscribe(result => {
        this.collections = result
        this.filteredCollections = result;
      });
  }

  ngOnInit(): void {
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
        this.collections = [...this.collections, response];
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);
      }
    })

    this.collectionForm.reset({ isVisible: true });
  }

  confirmDelete(collectionId: number) {
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
          this.collections = this.collections.filter(c => c.id !== collectionId);
          this.collectionService.deleteCollection(collectionId).subscribe({
            next: () => {
              this.toastService.showInfo('Confirmed', 'Record deleted');
            },
            error: ({ error }) => {
              this.toastService.showError("Error", error.title);
            }
          });
      }
    });
  }
}
