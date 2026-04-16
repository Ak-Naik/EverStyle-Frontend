export interface Collection {
    id: number;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    productsIds: number[];
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CollectionSummary {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    productsCount: number;
}