import { Recipe } from "../models/recipe.model";

export interface CollectionDto {
    id?: number;
    name: string;
    description: string;
    isVisible?: string;
    createdBy?: string;
    userPicture?: string;
    createdAt?: Date;
    recipes?: Recipe[]
}