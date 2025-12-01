import ProductRepository from "@/repositories/productRepository";
import { Product } from "@/types/product";
export default class ProductService {

    private repository = new ProductRepository();

    async list(): Promise<Product[]> {
        const products: Product[] = await this.repository.list();

        if (!products || products.length === 0) {
            return [];
        }

        // console.log(products);

        return products;
    }


    async listWithEnvolope(): Promise<Product[]> {
        const res = await this.repository.listTest();

        if (!res.success) {
            return [];
            // Validacoes
        }

        const products = res.data.data;
        return products;
    }

    async addProduct(data: Product): Promise<boolean> {
        console.log(data)

        const product: Product = {
            name: data.name,
            description: data.description,
            price: data.price,
            productCategory: data.productCategory,
            sku: data.sku,
            stock: data.stock
        }

        const res = await this.repository.addNewProduct(product);

        console.log(res);

        if (!res.success) {
            return false;
        }

        return true;
    }
}