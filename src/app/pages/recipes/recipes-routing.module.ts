import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AddSuggestionComponent } from './recipe-detail/add-suggestion/add-suggestion.component';
import { SuggestionDetailComponent } from './recipe-detail/suggestion-detail/suggestion-detail.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RecipeListComponent },
        { path: 'add', component: AddRecipeComponent },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/suggest', component: AddSuggestionComponent },
        { path: ':id/edit', component: EditRecipeComponent },
        { path: ':id/suggestions/:id', component: SuggestionDetailComponent },
    ])],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }
