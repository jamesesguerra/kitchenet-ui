import { Comment } from "./comment.model";

export interface SuggestionComment extends Comment {
    suggestionId: number;
}