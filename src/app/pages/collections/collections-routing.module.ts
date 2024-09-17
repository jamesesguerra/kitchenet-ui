import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollectionListComponent } from './collection-list/collection-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CollectionListComponent }
    ])],
    exports: [RouterModule]
})
export class CollectionsRoutingModule { }
