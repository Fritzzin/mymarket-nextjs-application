import { ApiEnvelope } from "@/types/apiEnvelope";
import { Product } from "@/types/product";

export interface IProductRepository {
    list(): Promise<ApiEnvelope<Product[]>>
    addOne(product: Product): Promise<ApiEnvelope<boolean>>
    deleteOne(id: string): Promise<boolean>
}