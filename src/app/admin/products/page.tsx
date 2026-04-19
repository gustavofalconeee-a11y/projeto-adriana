import { requireAuth } from '@/lib/auth-server';
import { products as staticProducts } from '@/data/products';
import AdminSidebar from '@/components/AdminSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Edit } from 'lucide-react';
import { deleteProductAction } from '@/app/actions/products';

import { supabaseAdmin } from '@/lib/supabase';
import DeleteProductButton from './DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    await requireAuth();

    let products: any[] = [];
    let dbStatus: string = "Conectando...";

    try {
        if (!supabaseAdmin) {
            dbStatus = "Erro: Cliente Supabase não configurado no .env";
        } else {
            // BUSCA EM AMBAS AS TABELAS POSSÍVEIS (Pode haver itens em ambas devido a migrações)
            const [res1, res2] = await Promise.all([
                supabaseAdmin.from('Product').select('*').order('name'),
                supabaseAdmin.from('products').select('*').order('name')
            ]);

            const allItems = [...(res1.data || []), ...(res2.data || [])];

            // Remove duplicados pelo ID (caso o item esteja em ambas)
            const uniqueItems = Array.from(new Map(allItems.map(item => [item.id, item])).values());

            if (res1.error && res2.error) {
                dbStatus = `Erro no banco: ${res1.error.message}`;
            } else {
                dbStatus = uniqueItems.length > 0 ? `OK (${uniqueItems.length} itens)` : "Banco conectado (0 itens encontrados)";
                products = uniqueItems.map((p: any) => ({
                    ...p,
                    directCheckoutLink: p.directCheckoutLink || p.direct_checkout_link || null,
                    personalizationEnabled: p.personalizationEnabled !== undefined ? p.personalizationEnabled : (p.personalization_enabled || false),
                    images: Array.isArray(p.images) ? p.images : (typeof p.images === 'string' ? [p.images] : []),
                    colors: Array.isArray(p.colors) ? p.colors.map((c: any) => typeof c === 'string' ? { name: c } : c) : []
                }));
            }
        }
    } catch (e: any) {
        dbStatus = `Erro fatal: ${e.message}`;
    }

    return (
        <AdminSidebar>
            <div className="p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-2">Estoque de Produtos</h1>
                        <p className="text-xs sm:text-sm text-gray-500 font-light tracking-wide">
                            Gerencie as bolsas e preços do seu catálogo direto no banco de dados.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded border ${dbStatus === 'OK' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                            Status DB: {dbStatus}
                        </div>
                        <Link
                            href="/admin/products/new"
                            className="flex items-center justify-center space-x-2 bg-emerald-800 text-white px-6 py-3 uppercase tracking-widest text-[10px] font-semibold hover:bg-emerald-900 transition-colors shadow-md"
                        >
                            <Plus size={14} />
                            <span>Adicionar Produto</span>
                        </Link>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#f9f9f9] border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Produto</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Preço</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cores</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Checkout</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-16 bg-gray-50 relative overflow-hidden flex-shrink-0">
                                                {product.images?.[0] ? (
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        sizes="48px"
                                                        className="object-contain p-1"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="text-[8px] text-gray-300 flex items-center justify-center h-full">N/A</div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                                <p className="text-xs text-gray-500 mt-1">{product.personalizationEnabled ? '✅ Personalização' : '❌ Personalização'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-gray-500 tracking-wide font-light">
                                        R$ {Number(product.price).toFixed(2).replace('.', ',')}
                                    </td>
                                    <td className="px-6 py-5 text-sm text-gray-500">
                                        <div className="flex flex-wrap gap-1">
                                            {product.colors && Array.isArray(product.colors) && product.colors.slice(0, 3).map((c: any, i: number) => (
                                                <span key={i} className="inline-block px-2 py-1 bg-gray-100 rounded text-[10px]">
                                                    {typeof c === 'string' ? c : c.name}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-xs text-gray-500">
                                        {product.directCheckoutLink ? (
                                            <span className="text-emerald-700 font-medium">Configurado</span>
                                        ) : 'Nenhum'}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end space-x-3">
                                            <Link
                                                href={`/admin/products/edit/${product.id}`}
                                                className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 p-2 rounded-full transition-colors"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <DeleteProductButton id={product.id} name={product.name} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && dbStatus === 'OK' && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-sm font-light text-gray-500 tracking-wide">
                                        Banco de dados conectado, mas nenhum produto foi encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminSidebar>
    );
}
