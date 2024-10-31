export interface Recipe {
    id: number;
    collectionId?: number;
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
    createdAt?: Date;
}