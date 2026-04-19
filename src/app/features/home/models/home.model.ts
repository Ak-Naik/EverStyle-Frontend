export interface Banner {
  id: number;
  imageUrl: string;
  linkUrl: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface featureProduct {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}