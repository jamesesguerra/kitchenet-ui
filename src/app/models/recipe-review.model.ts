export interface RecipeReview {
    id?: number;
    recipeId: number;
    rating: number;
    content: string;
    likeCount?: number;
    dislikeCount?: number;
    createdBy?: string;
    userPicture?: string;
    createdAt?: Date;
}