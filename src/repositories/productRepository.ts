import { IProductRepository } from "@/interfaces/IProductRepository";
import { ApiEnvelope } from "@/types/apiEnvelope";
import { Product } from "@/types/product";



export default class ProductRepository implements IProductRepository {
    async deleteOne(id: string): Promise<boolean> {
        try {
            const response = await fetch(`${process.env.API_URL}/products/${id}/delete`, { method: "delete" });
            if (response.status !== 204) {
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async list(): Promise<ApiEnvelope<Product[]>> {
        try {
            const response = await fetch(`${process.env.API_URL}/products`);
            const data = await response.json()

            return {
                data: data,
                success: true
            }

        } catch (error) {
            console.error(error);
            const message = String(error)
            return {
                data: message,
                success: false
            }
        }
    }

    async addOne(product: Product): Promise<ApiEnvelope<boolean>> {
        try {
            const response = await fetch(`${process.env.API_URL}/products`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(product)
            });

            const data = await response.json()

            return {
                data: data,
                success: true
            }

        } catch (error) {
            console.error(error);
            const message = String(error)
            return {
                data: message,
                success: false
            }
        }
    }
}