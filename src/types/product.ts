import { ProductCategory } from "@/enums/productCategory"

export type Product = {
    id?: string,
    name: string,
    description: string,
    productCategory: ProductCategory,
    price: number,
    sku: string,
    stock: number
}