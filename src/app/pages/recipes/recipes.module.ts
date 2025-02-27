import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { RecipeContentComponent } from './recipe-detail/recipe-content/recipe-content.component';
import { SuggestionListComponent } from './recipe-detail/suggestion-list/suggestion-list.component';
import { AddSuggestionComponent } from './recipe-detail/add-suggestion/add-suggestion.component';
import { SuggestionDetailComponent } from './recipe-detail/suggestion-detail/suggestion-detail.component';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { FieldChangeComponent } from './recipe-detail/suggestion-detail/field-change/field-change.component';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { FieldsetModule } from 'primeng/fieldset';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    RecipeContentComponent,
    SuggestionDetailComponent,
    SuggestionListComponent,
    AddSuggestionComponent,
    FieldChangeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardModule,
    DividerModule,
    FileUploadModule,
    ImageModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ToolbarModule,
    ButtonModule,
    DropdownModule,
    RatingModule,
    RecipesRoutingModule,
    TabViewModule,
    TagModule,
    AvatarModule,
    PanelModule,
    SkeletonModule,
    FieldsetModule,
    ReactiveFormsModule,
    SharedModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    DataViewModule,
    MenuModule
  ],
  providers: [ConfirmationService]
})
export class RecipesModule { }
