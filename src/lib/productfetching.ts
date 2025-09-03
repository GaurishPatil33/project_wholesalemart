import { products } from "./data";
import { Product } from "./types";

export function fetchAllProducts() {
    const product = products
    console.log(product)
    return product
}
export function fetchProductById(id: number | string):Product|undefined {
    const product = products.find(p => p.id === Number(id))
    
    return product

}

export function searchProduct(query: string) {
    const product = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.brand?.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    )
    return product
}

export function fetchProductByCategory(query: string) {
    const res = products.filter((p) => p.category === query)
    return res

}