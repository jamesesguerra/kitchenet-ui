export interface Recipe {
    id?: number;
    collectionId?: number;
    collectionName?: string;
    suggestionId?: number;
    name: string;
    description: string;
    coverPicture: string;
    prepTime: number;
    cookTime: number;
    ingredients?: string;
    instructions?: string;
    servings: number;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    fiber: number;
    createdBy?: string;
    createdAt?: Date;
    userId?: string;
}