import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Collection } from 'src/app/models/collection.model';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.scss'
})
export class CollectionListComponent implements OnInit {
  isModalVisible = false;
  showMessage = false;
  collections: Collection[];
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
    private collectionService: CollectionService, private toastService: ToastService) {
      this.collectionService.getCollections().subscribe(result => this.collections = result);
  }

  ngOnInit(): void {
      this.collectionForm.get("isVisible")?.valueChanges.subscribe(value => {
        const message = value
          ? { severity: 'warn', detail: 'You are creating a public collection' }
          : { severity: 'info', detail: 'You are creating a private collection' };
        this.messages = [message];
      })
  }

  showModal() {
    this.showMessage = true;
    this.isModalVisible = true;
  }

  hideModal() {
    this.showMessage = false;
    this.isModalVisible = false;
    this.collectionForm.reset({ isVisible: true });
  }

  saveCollection() {
    this.isModalVisible = false;
    this.toastService.showSuccess("Success!", "New collection has been saved");
  }

  onSubmit() {
    this.isModalVisible = false;

    const collection = this.collectionForm.value as Collection;
    this.collectionService.addCollection(collection).subscribe({
      next: (response) => {
        this.toastService.showSuccess("Success!", "Your new collection has been saved");
        this.collections = [...this.collections, response];
      },
      error: (error) => {
        this.toastService.showError("Error", error);
      }
    })

    this.collectionForm.reset({ isVisible: true });
  }
}
