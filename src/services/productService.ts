import { IProductRepository } from "@/interfaces/IProductRepository";
import { Product } from "@/types/product";
export default class ProductService {

    private repository;
    constructor(repository: IProductRepository) {
        this.repository = repository;
    }

    async deleteOne(id: string): Promise<boolean> {
        const res = await this.repository.deleteOne(id);

        if (!res) {
            return false;
        }
        return true;
    }

    async list(): Promise<Product[]> {
        const res = await this.repository.list();

        if (!res.success) {
            return [];
            // Validacoes
        }

        const products = res.data.data;
        // console.log(products);
        return products;
    }

    async addOne(data: Product): Promise<boolean> {
        console.log(data)

        const product: Product = {
            name: data.name,
            description: data.description,
            price: data.price,
            productCategory: data.productCategory,
            sku: data.sku,
            stock: data.stock
        }

        const res = await this.repository.addOne(product);

        console.log('response', res);

        if (!res.success || res.data.status === 400 || res.data.errors) {
            console.log('ERROR')
            return false;
        }
        return true;
    }
}