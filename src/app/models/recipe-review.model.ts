import { Comment } from "./comment.model";

export interface RecipeReview extends Comment {
    recipeId: number;
    rating: number;
}