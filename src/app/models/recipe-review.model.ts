export interface RecipeReview {
    id?: number;
    recipeId: number;
    rating: number;
    content: string;
    createdBy?: string;
    userPicture?: string;
    createdAt?: Date;
}