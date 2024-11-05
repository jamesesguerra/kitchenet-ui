import { Recipe } from "../models/recipe.model";

export interface SuggestionDto {
    id?: number;
    recipeId: number;
    title: string;
    description: string;
    status?: string;
    createdBy?: string;
    userPicture?: string;
    createdAt?: Date,
    recipeChanges: Partial<Recipe>;
}