import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CollectionListComponent },
        { path: ':id', component: CollectionDetailComponent }
    ])],
    exports: [RouterModule]
})
export class CollectionsRoutingModule { }
