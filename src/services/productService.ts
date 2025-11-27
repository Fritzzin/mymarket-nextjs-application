import ProductRepository from "@/repositories/productRepository";
import { Product } from "@/types/product";

export default class ProductService {

    service = new ProductRepository();

    async list(): Promise<Product[]> {
        const users: Product[] = await this.service.list();

        if (!users || users.length === 0) {
            return [];
        }

        return users;
    }

}