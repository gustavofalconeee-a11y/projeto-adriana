import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import ProductContent from './ProductContent';
import CartIndicator from '@/components/CartIndicator';
import { getYampiProductById } from '@/lib/yampi';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await getYampiProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-green-100 selection:text-green-900">

            {/* Navigation */}
            <nav className="w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-1">
                            <Link href="/catalog" className="inline-flex items-center text-sm uppercase tracking-widest text-gray-500 hover:text-emerald-700 transition duration-300">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">Voltar ao Catálogo</span>
                                <span className="sm:hidden">Voltar</span>
                            </Link>
                        </div>

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center justify-center flex-1">
                            <Link href="/">
                                <span className="font-serif text-2xl tracking-widest text-[#d4af37] font-light uppercase">
                                    Alora <span className="text-emerald-800">Acessórios</span>
                                </span>
                            </Link>
                        </div>

                        <div className="flex flex-1 justify-end items-center space-x-6">
                            <CartIndicator />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 sm:py-16">
                <ProductContent product={product} />
            </main>

            {/* Footer */}
            <footer className="bg-[#f9f9f9] py-16 px-4 border-t border-gray-100 mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-light tracking-widest text-gray-500 gap-6">
                    <div className="text-center md:text-left">
                        &copy; 2026 Alora Acessórios. Todos os direitos reservados.
                    </div>
                    <div className="flex space-x-8">
                        <a href="https://www.instagram.com/alora_acessorios_/" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition uppercase">Instagram</a>
                        <a href="https://wa.me/5521999141006" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition uppercase">WhatsApp</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
