'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Catalog({ products }: { products: any[] }) {
    const { cartCount } = useCart();
    const [isMounted, setIsMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
    const [sortOpen, setSortOpen] = useState(false);

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
            case 'price-asc':  list.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
            case 'price-desc': list.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
            case 'name':       list.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break;
        }
        return list;
    }, [products, searchTerm, sortBy]);

    const sortLabels: Record<string, string> = {
        default: 'Padrão',
        'price-asc': 'Menor Preço',
        'price-desc': 'Maior Preço',
        name: 'Nome A–Z',
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400;500;600&display=swap');

                :root {
                    --gold: #d4af37;
                    --dark: #0c1f14;
                    --emerald: #1a5c3a;
                    --cream: #faf8f3;
                }

                .font-display { font-family: 'Cormorant Garamond', serif; }
                .font-body    { font-family: 'Jost', sans-serif; }

                @keyframes shimmer {
                    0%   { background-position: -300% center; }
                    100% { background-position:  300% center; }
                }
                .gold-text {
                    background: linear-gradient(90deg, #b8960c, #e8cc6a, #d4af37, #f0d878, #b8960c);
                    background-size: 300% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 5s linear infinite;
                }

                .grid-texture {
                    background-image:
                        linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px);
                    background-size: 60px 60px;
                }

                /* Product card interactions */
                .product-card .card-overlay   { opacity: 0; transition: opacity 0.45s ease; }
                .product-card .card-cta        { transform: translateY(10px); opacity: 0; transition: transform 0.35s ease 0.07s, opacity 0.35s ease 0.07s; }
                .product-card:hover .card-overlay { opacity: 1; }
                .product-card:hover .card-cta     { transform: translateY(0); opacity: 1; }
                .product-card:hover .card-img      { transform: scale(1.05); }
                .card-img { transition: transform 0.75s ease; }

                .product-card:hover .corner-acc { opacity: 1; }
                .corner-acc { opacity: 0; transition: opacity 0.4s ease; }

                /* Search input */
                .search-input::placeholder { color: rgba(0,0,0,0.3); letter-spacing: 0.08em; }
                .search-input:focus { outline: none; border-color: var(--dark); }

                /* Sort dropdown */
                .sort-btn { transition: border-color 0.25s, color 0.25s; }
                .sort-btn:hover { border-color: var(--dark); color: var(--dark); }
            `}</style>

            <div className="min-h-screen font-body bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">

                {/* ── NAVIGATION ─────────────────────────────────────── */}
                <nav
                    className="sticky top-0 z-50 w-full"
                    style={{
                        background: 'rgba(12,31,20,0.97)',
                        backdropFilter: 'blur(12px)',
                        borderBottom: '1px solid rgba(212,175,55,0.12)',
                    }}
                >
                    <div className="max-w-7xl mx-auto px-6 lg:px-14">
                        <div className="flex items-center justify-between h-[88px]">

                            {/* Back */}
                            <Link
                                href="/"
                                className="group inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.45em] font-medium transition-colors duration-300"
                                style={{ color: 'rgba(255,255,255,0.4)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
                            >
                                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                                <span className="hidden sm:inline">Voltar</span>
                            </Link>

                            {/* Logo */}
                            <div className="absolute left-1/2 -translate-x-1/2 text-center">
                                <Link href="/">
                                    <p className="font-display text-xl tracking-[0.55em] font-light uppercase gold-text leading-none">Alora</p>
                                    <p className="text-[7px] tracking-[0.8em] uppercase font-body font-light mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                        Acessórios
                                    </p>
                                </Link>
                            </div>

                            {/* Cart */}
                            <Link href="/cart" className="relative p-2 group transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.45)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
                            >
                                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                                {isMounted && cartCount > 0 && (
                                    <span
                                        className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-semibold text-white"
                                        style={{ background: 'var(--gold)', color: '#000' }}
                                    >
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* ── HERO / HEADER ───────────────────────────────────── */}
                <section
                    className="relative py-28 sm:py-36 px-6 lg:px-14 overflow-hidden grid-texture"
                    style={{ background: 'var(--dark)' }}
                >
                    {/* Glow */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            width: '500px', height: '400px',
                            top: '50%', left: '60%',
                            transform: 'translate(-50%,-50%)',
                            background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)',
                        }}
                    />

                    {/* Giant background word */}
                    <div
                        className="absolute font-display font-light italic select-none pointer-events-none hidden lg:block"
                        style={{
                            fontSize: '30vw', color: 'rgba(255,255,255,0.018)',
                            bottom: '-4vw', right: '-4vw', lineHeight: 1,
                        }}
                    >
                        C
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-4 mb-10">
                            <div className="h-px w-10" style={{ background: 'rgba(212,175,55,0.4)' }} />
                            <span className="text-[8px] uppercase tracking-[0.55em] font-medium" style={{ color: 'var(--gold)' }}>
                                Coleção Atemporal
                            </span>
                            <div className="h-px w-10" style={{ background: 'rgba(212,175,55,0.4)' }} />
                        </div>

                        <h1 className="font-display font-light text-white leading-[0.88] mb-10" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)' }}>
                            Nossa <em className="gold-text">Coleção</em><br />Completa
                        </h1>

                        <div className="flex items-center justify-center gap-5 mt-10">
                            <div className="h-px w-14" style={{ background: 'rgba(212,175,55,0.25)' }} />
                            <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'var(--gold)' }} />
                            <div className="h-px w-14" style={{ background: 'rgba(212,175,55,0.25)' }} />
                        </div>

                        <p className="text-sm font-light leading-relaxed max-w-xl mx-auto mt-8" style={{ color: 'rgba(255,255,255,0.38)', letterSpacing: '0.05em' }}>
                            Descubra todos os nossos designs exclusivos. Do clássico ao moderno, cada peça é produzida com excelência artesanal e materiais selecionados.
                        </p>
                    </div>
                </section>

                {/* ── FILTERS TOOLBAR ─────────────────────────────────── */}
                <div
                    className="sticky top-[88px] z-40 px-6 lg:px-14 py-5"
                    style={{
                        background: 'rgba(250,248,243,0.97)',
                        backdropFilter: 'blur(10px)',
                        borderBottom: '1px solid #e5e0d5',
                    }}
                >
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        {/* Count */}
                        <p className="text-[9px] uppercase tracking-[0.35em] font-medium text-gray-400">
                            <span className="font-display italic text-xl font-light text-gray-700 mr-1.5" style={{ verticalAlign: 'middle' }}>
                                {filteredProducts.length}
                            </span>
                            {filteredProducts.length === 1 ? 'Produto' : 'Produtos'}
                            {products.length !== filteredProducts.length && (
                                <span className="text-gray-300 ml-1">/ {products.length}</span>
                            )}
                        </p>

                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="relative flex-1 sm:flex-none">
                                <Search
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                                    style={{ color: 'rgba(0,0,0,0.3)' }}
                                    strokeWidth={1.5}
                                />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar..."
                                    className="search-input w-full sm:w-56 pl-9 pr-4 py-2.5 text-[11px] tracking-wider bg-white transition-colors duration-200"
                                    style={{ border: '1px solid #ddd8cc', fontFamily: 'Jost, sans-serif' }}
                                />
                            </div>

                            {/* Sort dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setSortOpen(v => !v)}
                                    className="sort-btn flex items-center gap-2.5 px-4 py-2.5 bg-white text-[10px] uppercase tracking-[0.3em] font-medium text-gray-500"
                                    style={{ border: '1px solid #ddd8cc' }}
                                >
                                    <SlidersHorizontal className="w-3 h-3" strokeWidth={1.5} />
                                    <span className="hidden sm:inline">{sortLabels[sortBy]}</span>
                                </button>

                                <AnimatePresence>
                                    {sortOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.18 }}
                                            className="absolute right-0 top-full mt-1 w-44 bg-white z-50 shadow-xl"
                                            style={{ border: '1px solid #ddd8cc' }}
                                        >
                                            {(['default', 'price-asc', 'price-desc', 'name'] as const).map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => { setSortBy(opt); setSortOpen(false); }}
                                                    className="w-full text-left px-4 py-3 text-[9px] uppercase tracking-[0.3em] font-medium transition-colors duration-200"
                                                    style={{
                                                        background: sortBy === opt ? 'var(--dark)' : 'transparent',
                                                        color: sortBy === opt ? 'var(--gold)' : '#888',
                                                        borderBottom: '1px solid #f0ece4',
                                                        fontFamily: 'Jost, sans-serif',
                                                    }}
                                                >
                                                    {sortLabels[opt]}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── PRODUCT GRID ────────────────────────────────────── */}
                <main className="max-w-7xl mx-auto px-6 lg:px-14 py-16 sm:py-20" style={{ background: 'var(--cream)' }}>

                    {/* Empty state */}
                    {filteredProducts.length === 0 && (
                        <div className="py-32 text-center">
                            <p className="font-display italic text-4xl font-light text-gray-300 mb-4">Nenhum resultado</p>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">Tente ajustar a busca ou o filtro</p>
                        </div>
                    )}

                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.055 } }
                        }}
                        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-16 sm:gap-x-8 sm:gap-y-20"
                    >
                        {filteredProducts.map((product, index) => {
                            const hasPromotion = product.hasPromotion && product.originalPrice > 0;
                            return (
                                <motion.div
                                    key={product.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 22 },
                                        show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                                    }}
                                >
                                    <Link href={`/catalog/detalhes/${product.id}`} className="group product-card flex flex-col">

                                        {/* Image container */}
                                        <div
                                            className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-white"
                                            style={{ border: '1px solid #ede8df' }}
                                        >
                                            {/* Promo badge */}
                                            {hasPromotion && (
                                                <div
                                                    className="absolute top-3 left-3 z-30 text-[8px] uppercase tracking-[0.3em] font-semibold px-2.5 py-1"
                                                    style={{ background: 'var(--gold)', color: '#fff' }}
                                                >
                                                    Oferta
                                                </div>
                                            )}

                                            {/* Primary image */}
                                            {product.images && product.images.length > 0 && product.images[0] ? (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                    className="card-img object-contain p-6"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-[9px] uppercase tracking-[0.4em] text-gray-300">
                                                    Em Breve
                                                </div>
                                            )}

                                            {/* Secondary image on hover */}
                                            {product.images && product.images.length > 1 && product.images[1] && (
                                                <Image
                                                    src={product.images[1]}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                    className="object-contain p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out absolute inset-0"
                                                />
                                            )}

                                            {/* Dark overlay + CTA */}
                                            <div
                                                className="card-overlay absolute inset-0 z-20 flex items-end justify-center pb-6"
                                                style={{ background: 'linear-gradient(to top, rgba(12,31,20,0.72) 0%, transparent 55%)' }}
                                            >
                                                <span className="card-cta text-[8px] uppercase tracking-[0.5em] font-medium text-white">
                                                    Ver Detalhes
                                                </span>
                                            </div>

                                            {/* Gold corner accents on hover */}
                                            <div className="corner-acc absolute inset-0 pointer-events-none">
                                                <div className="absolute top-2.5 left-2.5 w-4 h-4" style={{ borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
                                                <div className="absolute top-2.5 right-2.5 w-4 h-4" style={{ borderTop: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />
                                                <div className="absolute bottom-2.5 left-2.5 w-4 h-4" style={{ borderBottom: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
                                                <div className="absolute bottom-2.5 right-2.5 w-4 h-4" style={{ borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />
                                            </div>
                                        </div>

                                        {/* Text info */}
                                        <div className="text-center px-1">
                                            {product.brand && (
                                                <p className="text-[8px] uppercase tracking-[0.45em] mb-1.5 font-medium" style={{ color: 'var(--gold)' }}>
                                                    {product.brand}
                                                </p>
                                            )}
                                            <h3 className="font-display font-light text-base sm:text-lg text-gray-900 group-hover:text-emerald-800 transition-colors duration-300 leading-snug mb-2.5 line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center justify-center gap-3">
                                                {hasPromotion && (
                                                    <span className="text-[10px] text-gray-300 line-through tracking-wider">
                                                        R$ {Number(product.originalPrice).toFixed(2).replace('.', ',')}
                                                    </span>
                                                )}
                                                <span
                                                    className="text-[11px] tracking-[0.25em] font-medium"
                                                    style={{ color: hasPromotion ? 'var(--emerald)' : '#888' }}
                                                >
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

                {/* ── FOOTER ──────────────────────────────────────────── */}
                <footer
                    className="py-16 px-6 lg:px-14"
                    style={{ background: 'var(--dark)', borderTop: '1px solid rgba(212,175,55,0.1)' }}
                >
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                        <div className="text-center md:text-left">
                            <p className="font-display text-sm uppercase tracking-[0.55em] font-light mb-1.5 gold-text">
                                Alora Acessórios
                            </p>
                            <p className="text-[8px] uppercase tracking-[0.4em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                                &copy; 2026 · Todos os direitos reservados
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="h-px w-12" style={{ background: 'rgba(212,175,55,0.2)' }} />
                            <div className="w-1 h-1 rotate-45" style={{ background: 'rgba(212,175,55,0.4)' }} />
                            <div className="h-px w-12" style={{ background: 'rgba(212,175,55,0.2)' }} />
                        </div>

                        <div className="flex gap-10">
                            {[
                                { label: 'Instagram', href: 'https://www.instagram.com/alora_acessorios_/' },
                                { label: 'WhatsApp', href: 'https://wa.me/5521999141006' },
                            ].map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[8px] uppercase tracking-[0.45em] font-medium transition-colors duration-300"
                                    style={{ color: 'rgba(255,255,255,0.35)' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
