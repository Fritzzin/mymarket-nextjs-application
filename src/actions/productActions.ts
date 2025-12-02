"use server"

import ProductRepository from '@/repositories/productRepository';
import ProductService from '@/services/productService';
import { revalidatePath } from 'next/cache'

export async function deleteProduct(id: string): Promise<boolean> {
    try {

        const repository = new ProductRepository();
        const service = new ProductService(repository);

        await service.deleteOne(id);

        // Realiza o refresh do cache
        revalidatePath('/products')

        return true
    } catch (error) {
        console.error(error);
        return false;
    }
}