enum CollectionVisibility { Public = 0, Private = 1 };

export interface Collection {
    id: number;
    name: string;
    description: string;
    visibility: CollectionVisibility;
}