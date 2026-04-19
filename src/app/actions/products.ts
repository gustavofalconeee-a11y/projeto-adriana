
'use server'

import { getYampiProducts, getYampiProductById } from '@/lib/yampi';

export async function fetchFeaturedProducts() {
    const products = await getYampiProducts();
    return products.slice(0, 6);
}

export async function fetchAllProducts() {
    return await getYampiProducts();
}

export async function fetchProductById(id: string) {
    return await getYampiProductById(id);
}
