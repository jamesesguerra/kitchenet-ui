import { Recipe } from "../models/recipe.model";

export interface SuggestionDto {
    id?: number;
    recipeId: number;
    title: string;
    description: string;
    createdBy?: string;
    recipeChanges: Partial<Recipe>;
}