export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    discountPrice?: number;
    imageUrl: string;
    images: string[];
    category: string;
    brand: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    tags: string[];
}

export interface ProductFilter {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
}