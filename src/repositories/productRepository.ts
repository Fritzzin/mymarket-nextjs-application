import { IProductRepository } from "@/interfaces/IProductRepository";
import { BASE_URL } from "@/lib/constants";
import { ApiEnvelope } from "@/types/apiEnvelope";
import { Product } from "@/types/product";


export default class ProductRepository implements IProductRepository {

    async list(): Promise<ApiEnvelope<Product[]>> {
        try {
            const response = await fetch(`${BASE_URL}/products`);
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
            const response = await fetch(`${BASE_URL}/products`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(product)
            });

            console.log(response);

            const data = await response.json()

            if (data.status === 400) {
                return {
                    data: data,
                    success: false
                }
            }

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