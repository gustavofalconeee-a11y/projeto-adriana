'use client';

import { useActionState } from 'react';
import { createProductAction } from '@/app/actions/products';
import Link from 'next/link';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

interface ActionState {
    error?: string;
    success?: boolean;
}

export default function NewProductPage() {
    const initialState: ActionState = {};
    const [state, formAction, pending] = useActionState(createProductAction as any, initialState);

    return (
        <AdminSidebar>
            <div className="p-8">
                <Link href="/admin/products" className="inline-flex items-center text-sm uppercase tracking-widest text-gray-500 hover:text-emerald-700 transition duration-300 mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao Estoque
                </Link>
                <div className="mb-10">
                    <h1 className="text-3xl font-serif text-gray-900 mb-2">Novo Produto</h1>
                    <p className="text-sm text-gray-500 font-light tracking-wide">
                        Defina os detalhes, cores, preço e checkout direto da sua nova bolsa premium.
                    </p>
                </div>

                <div className="bg-white border border-gray-100 p-8 shadow-sm">
                    <form action={formAction as any} className="space-y-8 max-w-2xl">
                        {(state as ActionState)?.error && (
                            <div className="bg-red-50 text-red-600 p-3 text-sm text-center border border-red-100">
                                {(state as ActionState).error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">Nome Principal da Bolsa *</label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 focus:bg-white focus:border-emerald-800 focus:outline-none transition-colors"
                                    placeholder="Bolsa Assinatura"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">Preço (R$) *</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    required
                                    className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 focus:bg-white focus:border-emerald-800 focus:outline-none transition-colors"
                                    placeholder="250.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">Descritivo Premium *</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 focus:bg-white focus:border-emerald-800 focus:outline-none transition-colors resize-none mb-6"
                                placeholder="Detalhes sobre a confecção, couro, caimento..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">URLs das Imagens (Uma por linha ou separadas por vírgula) *</label>
                            <p className="text-xs font-light text-gray-500 tracking-wide mb-3">Ex: /images/bolsa1.jpeg, /images/bolsa1-detalhe.jpeg</p>
                            <textarea
                                name="images"
                                required
                                rows={3}
                                className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 focus:bg-white focus:border-emerald-800 focus:outline-none transition-colors resize-none"
                                placeholder="/images/necessaire-Paris.jpeg"
                            />
                        </div>

                        <div className="border border-gray-100 p-6 bg-gray-50/50">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-200 pb-3">Estoque e Variações</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">Lista de Cores Oferecidas</label>
                                    <p className="text-xs font-light text-gray-500 tracking-wide mb-3">Insira as variações separadas por vírgula. Exemplo: Preto, Couro Nude, Verde Jade</p>
                                    <input
                                        name="colors"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 focus:bg-white focus:border-emerald-800 focus:outline-none transition-colors"
                                        placeholder="Nude, Marrom, Preto"
                                    />
                                </div>

                                <div className="flex items-center space-x-3 pt-2">
                                    <input
                                        type="checkbox"
                                        name="personalizationEnabled"
                                        id="personalizationEnabled"
                                        className="w-5 h-5 text-emerald-800 border-gray-300 focus:ring-emerald-800"
                                    />
                                    <label htmlFor="personalizationEnabled" className="text-sm font-medium tracking-wide text-gray-900 cursor-pointer">
                                        Habilitar Gravação A Laser / Personalização (Iniciais + Nota)
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-100 p-6 bg-gray-50/50">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-200 pb-3">Integração de Pagamento Individual</h3>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">URL de Checkout Direto (Linha 1 Item, opcional)</label>
                                <p className="text-xs font-light text-gray-500 tracking-wide mb-3">Se o cliente comprar apenas uma unidade, será redirecionado para este link se você configurar.</p>
                                <input
                                    name="linkUrl"
                                    type="url"
                                    className="w-full px-4 py-3 bg-[#f9f9f9] border border-gray-200 focus:bg-white focus:border-emerald-800 focus:outline-none transition-colors"
                                    placeholder="https://pay.kiwify.com/exemplo..."
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={pending}
                                className="w-full flex justify-center items-center space-x-2 bg-emerald-800 text-white py-4 uppercase tracking-[0.2em] text-sm font-semibold hover:bg-emerald-900 transition-colors disabled:opacity-50"
                            >
                                {pending ? (
                                    <span>Adicionando Estoque...</span>
                                ) : (
                                    <>
                                        <PlusCircle size={18} />
                                        <span>Cadastrar Nova Bolsa</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminSidebar>
    );
}
