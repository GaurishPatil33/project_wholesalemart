export type ProductSpecs = Record<string, string>;

export interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  video: string;
  images: string[];
  price: number;
  discount: number;
  description: string;
  product_specs: ProductSpecs; // dynamic object
  rating: number;
  reviews: Review[];
  sku: string;
  availabilityStatus:string;
  stock: number;
  shippingInformation: string;
  returnPolicy: string;
}


export interface Review {
  username: string; 
  rating: number;
  reviewTitle: string;
  comment: string;
  date: string;
}


export interface CartItem {
    product: Product
    price: number
    quantity: number
    attributes: { name: string, value: string }[]
    sku?: string
    selected?: boolean
}

export interface WishlistItem extends Product {
    product: Product
}