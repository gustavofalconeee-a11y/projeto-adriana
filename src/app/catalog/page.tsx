import CatalogClient from './CatalogClient';
import { getYampiProducts } from '@/lib/yampi';

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
    const products = await getYampiProducts();

    return <CatalogClient products={products} />;
}
