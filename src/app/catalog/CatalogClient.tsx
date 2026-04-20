'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Search } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Catalog({ products }: { products: any[] }) {
    const { cartCount } = useCart();
    const [isMounted, setIsMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const filteredProducts = useMemo(() => {
        let list = [...products];

        if (searchTerm.trim()) {
            const term = searchTerm.trim().toLowerCase();
            list = list.filter((p) => p.name?.toLowerCase().includes(term));
        }

        switch (sortBy) {
            case 'price-asc':
                list.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            case 'price-desc':
                list.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            case 'name':
                list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                break;
            default:
                break;
        }

        return list;
    }, [products, searchTerm, sortBy]);

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-900 selection:text-white">

            {/* Navigation */}
            <nav className="w-full bg-white z-50 border-b border-gray-100 sticky top-0">
                <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                    <div className="flex justify-between items-center h-24">
                        <div className="flex-1">
                            <Link href="/" className="group inline-flex items-center text-[10px] uppercase tracking-[0.25em] text-gray-500 hover:text-emerald-900 transition-colors font-medium gap-3">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
                                Início
                            </Link>
                        </div>

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center justify-center flex-1">
                            <Link href="/">
                                <span className="font-serif text-2xl tracking-[0.25em] text-gray-900 font-light uppercase text-center block whitespace-nowrap">
                                    Alora
                                </span>
                            </Link>
                        </div>

                        <div className="flex flex-1 justify-end items-center space-x-6">
                            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-gray-400 hover:text-emerald-900 transition-colors">
                                <Search className="w-5 h-5" strokeWidth={1.5} />
                            </button>
                            <Link href="/cart" className="relative p-2 text-gray-400 hover:text-emerald-900 transition-colors">
                                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                                {isMounted && cartCount > 0 && (
                                    <span className="absolute top-1 right-0 bg-[#d4af37] text-white text-[9px] w-4 h-4 flex items-center justify-center font-medium">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Search Bar Animada */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-[#fafafa] border-b border-gray-100 overflow-hidden"
                    >
                        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-8">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Busque por nome ou estilo..."
                                className="w-full bg-transparent text-2xl font-serif font-light text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-0"
                                autoFocus
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header do Catálogo */}
            <section className="pt-24 pb-16 px-6 md:px-12 text-center max-w-screen-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-gray-900 mb-6">
                    A <span className="italic text-emerald-900">Coleção</span>
                </h1>
                <div className="w-px h-16 bg-[#d4af37]/50 mx-auto mb-8"></div>
            </section>

            <main className="max-w-screen-2xl mx-auto px-6 md:px-12 pb-32">

                {/* Filters Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">
                        {filteredProducts.length} Peças
                    </div>

                    <div className="relative group">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="appearance-none bg-transparent pr-8 text-[10px] uppercase tracking-[0.2em] text-gray-900 font-medium cursor-pointer focus:outline-none border-b border-transparent group-hover:border-emerald-900 transition-colors pb-1"
                        >
                            <option value="default">Ordernar: Padrão</option>
                            <option value="name">Alfabético</option>
                            <option value="price-asc">Menor Preço</option>
                            <option value="price-desc">Maior Preço</option>
                        </select>
                        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pb-1">▼</div>
                    </div>
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-32">
                        <p className="text-2xl font-serif font-light text-gray-400 mb-4">Nenhuma peça encontrada.</p>
                        <button onClick={() => setSearchTerm('')} className="text-[10px] uppercase tracking-[0.2em] text-emerald-900 border-b border-emerald-900 pb-1">
                            Limpar busca
                        </button>
                    </div>
                )}

                {/* Product Grid - Galeria */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20"
                >
                    {filteredProducts.map((product) => {
                        const hasPromotion = product.hasPromotion && product.originalPrice > 0;
                        return (
                            <motion.div
                                key={product.id}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0 }
                                }}
                            >
                                <Link href={`/catalog/detalhes/${product.id}`} className="group flex flex-col h-full">
                                    <div className="relative w-full aspect-[3/4] bg-[#f4f4f4] mb-6 overflow-hidden">
                                        
                                        {/* Promotion badge sutil */}
                                        {hasPromotion && (
                                            <div className="absolute top-4 left-4 z-30 bg-white/90 backdrop-blur-sm text-emerald-900 text-[9px] uppercase tracking-[0.25em] font-medium px-3 py-1.5 border border-emerald-900/10">
                                                Special
                                            </div>
                                        )}

                                        {/* Product Image */}
                                        {((product as any).images && (product as any).images.length > 0 && (product as any).images[0]) ? (
                                            <Image
                                                src={(product as any).images[0]}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                className="object-contain p-8 group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-light text-[10px] tracking-[0.3em] uppercase">
                                                Em Breve
                                            </div>
                                        )}

                                        {/* Imagem Secundária (Hover) */}
                                        {(product as any).images && (product as any).images.length > 1 && (product as any).images[1] && (
                                            <Image
                                                src={(product as any).images[1]}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                className="object-contain p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-[#f4f4f4]"
                                            />
                                        )}

                                        {/* Borda interna de luxo ao passar o mouse */}
                                        <div className="absolute inset-3 border border-[#d4af37]/0 group-hover:border-[#d4af37]/40 transition-colors duration-700 pointer-events-none z-20"></div>
                                    </div>

                                    {/* Text Info */}
                                    <div className="flex flex-col mt-auto">
                                        {product.brand && (
                                            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2 font-medium">
                                                {product.brand}
                                            </p>
                                        )}
                                        <h3 className="text-base font-serif font-light mb-3 text-gray-900 group-hover:text-emerald-900 transition-colors leading-relaxed">
                                            {product.name}
                                        </h3>

                                        {/* Price */}
                                        <div className="flex items-center gap-3">
                                            {hasPromotion && (
                                                <span className="text-xs text-gray-400 line-through tracking-wider">
                                                    R$ {Number(product.originalPrice).toFixed(2).replace('.', ',')}
                                                </span>
                                            )}
                                            <span className={`text-sm tracking-[0.15em] ${hasPromotion ? 'text-emerald-900 font-medium' : 'text-gray-600'}`}>
                                                R$ {product.price.toFixed(2).replace('.', ',')}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="bg-[#fafafa] py-12 px-6 md:px-12 border-t border-gray-100">
                <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center text-[9px] font-medium tracking-[0.3em] text-gray-400 uppercase gap-8">
                    <div>
                        &copy; {new Date().getFullYear()} ALORA ACESSÓRIOS.
                    </div>
                    <div className="flex space-x-12">
                        <a href="https://www.instagram.com/alora_acessorios_/" target="_blank" rel="noreferrer" className="hover:text-emerald-900 transition-colors">Instagram</a>
                        <a href="https://wa.me/5521999141006" target="_blank" rel="noreferrer" className="hover:text-emerald-900 transition-colors">WhatsApp</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
