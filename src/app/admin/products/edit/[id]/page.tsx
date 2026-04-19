import { requireAuth } from '@/lib/auth-server';
import { products as staticProducts } from '@/data/products';
import AdminSidebar from '@/components/AdminSidebar';
import { notFound } from 'next/navigation';
import EditProductForm from './EditProductForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { supabaseAdmin } from '@/lib/supabase';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    await requireAuth();
    const { id } = await params;

    let product = staticProducts.find(p => p.id === id);

    if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin
            .from('Product')
            .select('*')
            .eq('id', id)
            .single();

        if (data && !error) {
            product = {
                ...data,
                colors: Array.isArray(data.colors) ? data.colors.map((c: any) => typeof c === 'string' ? { name: c } : c) : []
            };
        }
    }

    if (!product) {
        notFound();
    }

    // Formata para o formato esperado pelo form (normaliza snake_case do DB para camelCase do Form)
    const formattedProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images || [],
        directCheckoutLink: (product as any).directCheckoutLink || null,
        personalizationEnabled: (product as any).personalizationEnabled || false,
        colors: product.colors || [],
    };

    return (
        <AdminSidebar>
            <div className="p-8">
                <div className="mb-10">
                    <Link
                        href="/admin/products"
                        className="inline-flex items-center text-xs uppercase tracking-widest text-gray-400 hover:text-emerald-800 transition mb-6"
                    >
                        <ArrowLeft size={14} className="mr-2" />
                        Voltar ao Estoque
                    </Link>
                    <h1 className="text-3xl font-serif text-gray-900 mb-2">Editar Produto</h1>
                    <p className="text-sm text-gray-500 font-light tracking-wide">
                        Modifique os detalhes da bolsa &quot;{product.name}&quot;.
                    </p>
                </div>

                <div className="bg-white p-8 border border-gray-100 shadow-sm">
                    <EditProductForm product={formattedProduct as any} />
                </div>
            </div>
        </AdminSidebar>
    );
}
