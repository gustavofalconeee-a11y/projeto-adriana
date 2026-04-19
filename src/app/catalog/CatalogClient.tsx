'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Catalog({ products }: { products: any[] }) {
    const { cartCount } = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-green-100 selection:text-green-900">

            {/* Navigation */}
            <nav className="w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-1">
                            <Link href="/" className="inline-flex items-center text-sm uppercase tracking-widest text-gray-500 hover:text-emerald-700 transition duration-300">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Voltar
                            </Link>
                        </div>

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center justify-center flex-1">
                            <Link href="/">
                                <span className="font-serif text-2xl tracking-widest text-[#d4af37] font-light uppercase text-center block">
                                    Alora <span className="text-emerald-800">Acessórios</span>
                                </span>
                            </Link>
                        </div>

                        <div className="flex flex-1 justify-end items-center space-x-6">
                            <Link href="/cart" className="relative p-2 text-gray-800 hover:text-emerald-700 transition">
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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col items-center mb-16">
                    <h1 className="text-4xl font-serif font-light text-center">Nossa Coleção Completa</h1>
                    <div className="w-12 h-px bg-[#d4af37] mt-8"></div>
                    <p className="mt-6 text-gray-500 font-light tracking-wide text-center max-w-2xl text-sm leading-relaxed">
                        Descubra todos os nossos designs exclusivos. Do clássico ao moderno, cada bolsa é produzida com excelência.
                    </p>
                </div>

                {/* Product Grid */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-16"
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link href={`/catalog/detalhes/${product.id}`} className="group flex flex-col">
                                <div className="w-full aspect-[4/5] bg-[#f9f9f9] mb-4 relative overflow-hidden flex items-center justify-center border border-gray-100">
                                    {/* Product Image */}
                                    {((product as any).images && (product as any).images.length > 0 && (product as any).images[0]) ? (
                                        <Image
                                            src={(product as any).images[0]}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                        />
                                    ) : (
                                        <div className="relative z-10 text-gray-300 font-light text-[10px] tracking-widest uppercase">
                                            Em Breve
                                        </div>
                                    )}

                                    {/* Overlay Action */}
                                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                                        <div className="w-full bg-white/95 backdrop-blur text-gray-900 py-3 text-center uppercase tracking-widest text-[10px] font-semibold group-hover:bg-emerald-800 group-hover:text-white transition-colors duration-300 shadow-sm border border-gray-100">
                                            Ver Detalhes
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-2 px-2">
                                    <h3 className="text-sm font-serif font-light mb-1 text-gray-900 group-hover:text-emerald-800 transition-colors">{product.name}</h3>
                                    <p className="text-xs tracking-widest text-gray-500">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
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
