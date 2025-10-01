export type ProductSpecs = Record<string, string>;

export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  subcategory: string;
  product_type: string;
  video: string | null;
  images: string[];
  price: number;
  discount: number;
  description: string;
  product_specs: Record<string, string | string[] | undefined>;
  rating: number;
  reviews: any[];
  sku: string;
  availabilityStatus: string;
  stock: number;
  shippingInformation: string;
  returnPolicy: string;
  minimumOrderQuantity: any[];
  sizes: any[];
  colors: string[];
  updatedAt: string
  sales: number
  isTrending?: boolean|undefined
}


export interface Review {
  username: string;
  rating: number;
  reviewTitle: string;
  comment: string;
  date: string;
}

export interface Category {
  slug: string
  title: string
  image: string
  subCategories?: Category[]
}

export interface CartItem {
  product: Product
  price: number
  quantity: number
  attributes?: { name: string, value: string }[]
  sku?: string
  selected?: boolean
}

export interface WishlistItem extends Product {
  product: Product
}