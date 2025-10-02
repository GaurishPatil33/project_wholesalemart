import { Categories, Products } from "./data";
import { Product, Category } from "./types";

// Fetch all products
export function fetchAllProducts(): Product[] {
    return Products;
}

// Fetch a single product by ID
export function fetchProductById(id: number | string): Product | undefined {
    console.log(id)
    const numricId = Number(id)
    const product = Products.find(p => p.id === numricId);
    console.log(product)
    return product
}

// Search products by query in title, brand, description, or category
export function searchProduct(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return Products.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.brand?.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
}

// Fetch products by category
export function fetchProductByCategory(category: string): Product[] {
    return Products.filter(p => p.category === category);
}

// Fetch all categories
export function fetchCategories(): Category[] {
    return Categories;
}
