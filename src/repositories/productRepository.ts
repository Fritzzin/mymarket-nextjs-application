import { ApiEnvolepe } from "@/types/apiEnvelope";
import { Product } from "@/types/product";

const BASE_URL = "http://localhost:5109/api/products";

export default class ProductRepository {

    async list(): Promise<Product[]> {
        try {
            const response = await fetch(BASE_URL);

            if (!response.ok) {
                return [];
            }

            const dataInJson = await response.json();
            return dataInJson.data;

        } catch (error) {
            console.error(error)
            throw (error)
        }
    }

    async listTest(): Promise<ApiEnvolepe<Product[]>> {
        try {
            const response = await fetch(BASE_URL);
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

    async addNewProduct(product:Product): Promise<ApiEnvolepe<Product>> {
        try {
            const response = await fetch(BASE_URL, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(product)
            });

            console.log(response);

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