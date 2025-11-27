import { Product } from "@/types/product";

const BASE_URL = "http://localhost:5109/api/products";

export default class ProductRepository {

    async listAll(): Promise<Product[]> {
        try {
            const response = await fetch(BASE_URL);

            if (!response.ok) {
                return [];
            }

            const dataInJson = await response.json();
            return dataInJson.data as Product[];

        } catch (error) {
            console.error(error)
            throw (error)
        }
    }
}