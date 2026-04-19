'use client';

import { useActionState } from 'react';
import { updateProductAction } from '@/app/actions/products';
import { useRouter } from 'next/navigation';

interface ProductData {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    directCheckoutLink: string | null;
    personalizationEnabled: boolean;
    colors: { name: string }[];
}

export default function EditProductForm({ product }: { product: ProductData }) {
    const router = useRouter();
    const updateProductWithId = updateProductAction.bind(null, product.id);
    const [state, formAction, pending] = useActionState(updateProductWithId as any, {} as any);

    return (
        <form action={formAction as any} className="space-y-8 max-w-2xl">
            {(state as any)?.error && (
                <div className="bg-red-50 text-red-600 p-4 text-sm border border-red-100 rounded-lg">
                    {state.error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">Nome do Produto</label>
                    <input
                        name="name"
                        defaultValue={product.name}
                        required
                        className="w-full px-4 py-3 border border-gray-200 focus:border-emerald-800 focus:outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">Preço (R$)</label>
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        defaultValue={product.price}
                        required
                        className="w-full px-4 py-3 border border-gray-200 focus:border-emerald-800 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">Descrição</label>
                <textarea
                    name="description"
                    rows={4}
                    defaultValue={product.description}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-emerald-800 focus:outline-none transition-colors"
                />
            </div>

            <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">URLs das Imagens (Uma por linha ou separadas por vírgula)</label>
                <textarea
                    name="images"
                    rows={3}
                    defaultValue={product.images.join('\n')}
                    placeholder="/images/bolsa1.jpg, /images/bolsa2.jpg"
                    className="w-full px-4 py-3 border border-gray-200 focus:border-emerald-800 focus:outline-none transition-colors font-mono text-sm"
                />
            </div>

            <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">Cores Disponíveis (Separadas por vírgula)</label>
                <input
                    name="colors"
                    defaultValue={product.colors.map(c => c.name).join(', ')}
                    placeholder="Preto, Nude, Caramelo"
                    className="w-full px-4 py-3 border border-gray-200 focus:border-emerald-800 focus:outline-none transition-colors"
                />
            </div>

            <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">Link de Checkout Direto (Opcional)</label>
                <input
                    name="linkUrl"
                    defaultValue={product.directCheckoutLink || ''}
                    placeholder="https://checkout.pagseguro..."
                    className="w-full px-4 py-3 border border-gray-200 focus:border-emerald-800 focus:outline-none transition-colors"
                />
            </div>

            <div className="flex items-center space-x-3 bg-gray-50 p-4 border border-gray-100">
                <input
                    id="personalizationEnabled"
                    name="personalizationEnabled"
                    type="checkbox"
                    defaultChecked={product.personalizationEnabled}
                    className="w-4 h-4 text-emerald-800 focus:ring-emerald-800 border-gray-300 rounded"
                />
                <label htmlFor="personalizationEnabled" className="text-sm text-gray-700 font-medium">Habilitar Personalização de Nome</label>
            </div>

            <div className="flex space-x-4 pt-4">
                <button
                    type="submit"
                    disabled={pending}
                    className="bg-gray-900 text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-emerald-800 transition-colors disabled:opacity-50"
                >
                    {pending ? 'Salvando...' : 'Atualizar Produto'}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
