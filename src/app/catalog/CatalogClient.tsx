'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Search, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Catalog({ products }: { products: any[] }) {
    const { cartCount } = useCart();
    const [isMounted, setIsMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

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
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">

            {/* Navigation */}
            <nav className="w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-1">
                            <Link href="/" className="inline-flex items-center text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gray-500 hover:text-emerald-800 transition duration-300 font-medium">
                                <ArrowLeft className="w-3.5 h-3.5 mr-2" />
                                Voltar
                            </Link>
                        </div>

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center justify-center flex-1">
                            <Link href="/">
                                <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] text-[#d4af37] font-light uppercase text-center block whitespace-nowrap">
                                    Alora <span className="text-emerald-800">Acessórios</span>
                                </span>
                            </Link>
                        </div>

                        <div className="flex flex-1 justify-end items-center space-x-6">
                            <Link href="/cart" className="relative p-2 text-gray-800 hover:text-emerald-800 transition">
                                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                                {isMounted && cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-emerald-800 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero / Header */}
            <section className="relative bg-gradient-to-b from-[#f9f9f9] via-white to-white border-b border-gray-100 overflow-hidden">
                {/* Decorative blurs using brand palette */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="flex flex-col items-center text-center">
                        <span className="inline-flex items-center gap-2 text-emerald-800 text-[10px] uppercase tracking-[0.35em] font-semibold mb-5">
                            <Sparkles className="w-3 h-3 text-[#d4af37]" strokeWidth={1.5} />
                            Coleção Atemporal
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-gray-900 leading-tight">
                            Nossa <span className="italic text-emerald-800">Coleção</span> Completa
                        </h1>

                        {/* Ornament */}
                        <div className="flex items-center gap-3 mt-8">
                            <div className="w-10 h-px bg-gray-300" />
                            <div className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]" />
                            <div className="w-10 h-px bg-gray-300" />
                        </div>

                        <p className="mt-8 text-gray-500 font-light tracking-wide text-center max-w-2xl text-sm sm:text-base leading-relaxed">
                            Descubra todos os nossos designs exclusivos. Do clássico ao moderno, cada peça é
                            cuidadosamente produzida com excelência e materiais selecionados.
                        </p>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

                {/* Filters toolbar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 pb-6 border-b border-gray-100">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-gray-500 font-medium">
                        <span className="text-gray-900 font-semibold">{filteredProducts.length}</span>
                        {filteredProducts.length === 1 ? ' Produto' : ' Produtos'}
                        {products.length !== filteredProducts.length && (
                            <span className="text-gray-400"> de {products.length}</span>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar produto..."
                                className="w-full sm:w-64 pl-9 pr-3 py-2.5 text-xs tracking-wider border border-gray-200 bg-white focus:outline-none focus:border-emerald-800 transition placeholder:text-gray-400"
                            />
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="appearance-none w-full sm:w-auto px-4 py-2.5 pr-9 text-[11px] uppercase tracking-[0.2em] border border-gray-200 bg-white text-gray-700 focus:outline-none focus:border-emerald-800 transition cursor-pointer font-medium"
                            >
                                <option value="default">Ordenar por</option>
                                <option value="name">Nome (A-Z)</option>
                                <option value="price-asc">Menor Preço</option>
                                <option value="price-desc">Maior Preço</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">▼</span>
                        </div>
                    </div>
                </div>

                {/* Empty state */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-24">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#f9f9f9] border border-gray-100 mb-6">
                            <Search className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                        </div>
                        <p className="text-sm font-serif font-light text-gray-900 mb-2">Nenhum produto encontrado</p>
                        <p className="text-xs tracking-wider text-gray-500">Tente ajustar sua busca ou filtro.</p>
                    </div>
                )}

                {/* Product Grid */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.06
                            }
                        }
                    }}
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16"
                >
                    {filteredProducts.map((product) => {
                        const hasPromotion = product.hasPromotion && product.originalPrice > 0;
                        return (
                            <motion.div
                                key={product.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                            >
                                <Link href={`/catalog/detalhes/${product.id}`} className="group flex flex-col">
                                    <div className="relative w-full aspect-[4/5] bg-[#f9f9f9] mb-5 overflow-hidden border border-gray-100 group-hover:border-emerald-800/20 transition-colors duration-500">
                                        {/* Promotion badge (gold) */}
                                        {hasPromotion && (
                                            <div className="absolute top-3 left-3 z-30 bg-[#d4af37] text-white text-[9px] uppercase tracking-[0.25em] font-bold px-2.5 py-1">
                                                Oferta
                                            </div>
                                        )}

                                        {/* Product Image */}
                                        {((product as any).images && (product as any).images.length > 0 && (product as any).images[0]) ? (
                                            <Image
                                                src={(product as any).images[0]}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                className="object-contain p-6 group-hover:scale-[1.04] transition-transform duration-[900ms] ease-out"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-light text-[10px] tracking-[0.3em] uppercase">
                                                Em Breve
                                            </div>
                                        )}

                                        {/* Secondary image on hover (if exists) */}
                                        {(product as any).images && (product as any).images.length > 1 && (product as any).images[1] && (
                                            <Image
                                                src={(product as any).images[1]}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                className="object-contain p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                                            />
                                        )}

                                        {/* Overlay Action */}
                                        <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                                            <div className="w-full bg-emerald-800 text-white py-3 text-center uppercase tracking-[0.25em] text-[10px] font-semibold shadow-md">
                                                Ver Detalhes
                                            </div>
                                        </div>

                                        {/* subtle gold corner accents on hover */}
                                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#d4af37]" />
                                            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#d4af37]" />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <div className="text-center px-1">
                                        {product.brand && (
                                            <p className="text-[9px] uppercase tracking-[0.35em] text-[#d4af37] mb-1.5 font-medium">
                                                {product.brand}
                                            </p>
                                        )}
                                        <h3 className="text-sm sm:text-base font-serif font-light mb-2 text-gray-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2 min-h-[2.5rem]">
                                            {product.name}
                                        </h3>

                                        {/* Price */}
                                        <div className="flex items-center justify-center gap-2 mt-2">
                                            {hasPromotion && (
                                                <span className="text-[11px] text-gray-400 line-through tracking-wider">
                                                    R$ {Number(product.originalPrice).toFixed(2).replace('.', ',')}
                                                </span>
                                            )}
                                            <span className={`text-xs tracking-[0.15em] font-medium ${hasPromotion ? 'text-emerald-800' : 'text-gray-700'}`}>
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
            <footer className="bg-[#f9f9f9] py-16 px-4 border-t border-gray-100 mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-10">
                        <div className="w-12 h-px bg-gray-300" />
                        <span className="font-serif text-sm tracking-[0.3em] text-[#d4af37] uppercase">Alora</span>
                        <div className="w-12 h-px bg-gray-300" />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-light tracking-[0.2em] text-gray-500 gap-6 uppercase">
                        <div className="text-center md:text-left">
                            &copy; 2026 Alora Acessórios. Todos os direitos reservados.
                        </div>
                        <div className="flex space-x-8 font-medium">
                            <a href="https://www.instagram.com/alora_acessorios_/" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition">Instagram</a>
                            <a href="https://wa.me/5521999141006" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition">WhatsApp</a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}
