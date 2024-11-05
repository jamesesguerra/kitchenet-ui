export interface RecipeSummaryDto {
    id: number;
    collection: string;
    name: string;
    description: string;
    averageRating: number;
    coverPicture: string;
    createdAt: Date;
}