import { Recipe } from "../models/recipe.model";

export interface CollectionDto {
    id?: number;
    name: string;
    description: string;
    createdAt?: Date;
    recipes?: Recipe[]
}