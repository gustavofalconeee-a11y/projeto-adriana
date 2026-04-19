'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Instagram } from 'lucide-react';
import Image from 'next/image';
import CartIndicator from '@/components/CartIndicator';
import { products as staticProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';

import { fetchFeaturedProducts } from '@/app/actions/products';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    async function getProducts() {
      const products = await fetchFeaturedProducts();
      setFeaturedProducts(products);
    }
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-green-100 selection:text-green-900">

      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-1">
              <Link href="/catalog" className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-700 hover:text-emerald-800 transition hidden sm:inline-block">
                Catálogo
              </Link>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center flex-1">
              <Link href="/">
                <span className="font-serif text-xl sm:text-2xl tracking-widest text-[#d4af37] font-light uppercase whitespace-nowrap">
                  Alora <span className="text-emerald-800">Acessórios</span>
                </span>
              </Link>
            </div>

            <div className="flex flex-1 justify-end items-center space-x-2 sm:space-x-4">
              <Link href="/catalog" className="sm:hidden p-2">
                <span className="text-[10px] uppercase tracking-widest font-semibold">Catálogo</span>
              </Link>
              <CartIndicator />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#f9f9f9]">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-transparent opacity-50"></div>
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-[#d4af37]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <span className="inline-block text-emerald-800 text-[10px] uppercase tracking-[0.4em] font-bold mb-4 animate-fade-in">Nova Coleção</span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light font-serif text-gray-900 mb-6 leading-tight">
            Eleve o seu <span className="italic text-emerald-800">Estilo</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-500 font-light mb-10 max-w-2xl mx-auto tracking-wide leading-relaxed">
            Descubra uma coleção de bolsas premium que combinam elegância atemporal com design minimalista. Cada peça é uma obra de arte fabricada com excelência.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              href="/catalog"
              className="group w-full sm:w-auto flex items-center justify-center space-x-3 bg-gray-900 text-white px-10 py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-emerald-800 transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-emerald-200/50"
            >
              <span>Explorar Coleção</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 sm:py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 sm:mb-20">
          <span className="text-emerald-700 text-[10px] uppercase tracking-[0.3em] font-semibold mb-3 text-center">Seleção Curada</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-center">Destaques da Temporada</h2>
          <div className="w-12 h-px bg-[#d4af37] mt-6 sm:mt-8"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 lg:gap-16">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/catalog/detalhes/${product.id}`} className="group flex flex-col items-center">
                <div className="w-full aspect-[4/5] bg-[#f9f9f9] mb-6 relative overflow-hidden flex items-center justify-center border border-gray-100">
                  {/* Product Image */}
                  {((product as any).images && (product as any).images.length > 0) ? (
                    <Image
                      src={(product as any).images[0]}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="relative z-10 text-gray-300 font-light text-xs tracking-widest uppercase">Em breve</div>
                  )}

                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                    <div className="w-full bg-white/95 backdrop-blur text-gray-900 py-3 text-center uppercase tracking-widest text-[10px] font-bold group-hover:bg-emerald-800 group-hover:text-white transition-colors duration-300 shadow-sm border border-gray-200">
                      Ver Detalhes
                    </div>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-serif font-light mb-2 text-center group-hover:text-emerald-800 transition-colors">{product.name}</h3>
                <p className="text-xs sm:text-sm tracking-widest text-gray-500 text-center">R$ {product.price.toFixed(2).replace('.', ',')}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/catalog" className="inline-block border-b border-gray-900 pb-1 text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-700 hover:border-emerald-700 transition-colors duration-300">
            Ver Todas as Bolsas
          </Link>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="bg-emerald-900 text-white py-24 sm:py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light mb-8 leading-tight">
            "Mais do que um simples acessório, é uma declaração de <span className="italic text-emerald-200">simplicidade refinada</span> e luxo despretensioso."
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/70 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Na Alora Acessórios, acreditamos no poder do minimalismo. Peças projetadas com foco em linhas limpas e materiais premium, garantindo que permaneçam atemporais.
          </p>
        </div>
      </section>

      {/* Instagram Journey CTA */}
      <section className="py-32 px-4 relative overflow-hidden bg-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-50 rounded-[100%] blur-[120px] opacity-40 -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-10 border border-emerald-100/50">
            <Instagram className="text-emerald-800 w-6 h-6" strokeWidth={1.5} />
          </div>

          <h2 className="text-4xl sm:text-5xl font-serif font-light text-gray-900 mb-8 leading-tight">
            Curadoria Diária no <span className="italic block mt-2 text-emerald-800">Instagram</span>
          </h2>

          <p className="text-gray-500 font-light tracking-wide max-w-lg mx-auto mb-12 leading-relaxed">
            Acompanhe lançamentos exclusivos e inspirações de estilo diretamente em nossa rede oficial. Uma extensão do nosso universo minimalista.
          </p>

          <div className="flex flex-col items-center justify-center space-y-6">
            <a
              href="https://www.instagram.com/alora_acessorios_/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center space-x-4 px-12 py-5 bg-white border border-gray-200 shadow-sm hover:border-emerald-800 transition-all duration-500"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-900 group-hover:text-emerald-800">Seguir @alora_acessorios_</span>
            </a>

            <div className="flex items-center space-x-3 text-emerald-800/40">
              <div className="w-12 h-px bg-current"></div>
              <span className="text-[8px] uppercase tracking-[0.5em] font-bold">Comunidade Alora</span>
              <div className="w-12 h-px bg-current"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f9f9f9] py-16 px-4 border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-light tracking-widest text-gray-500 gap-8">
          <div className="text-center md:text-left">
            &copy; 2026 Alora Acessórios. Todos os direitos reservados.
          </div>
          <div className="flex space-x-10 uppercase font-semibold">
            <a href="https://www.instagram.com/alora_acessorios_/" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition">Instagram</a>
            <a href="https://wa.me/5521999141006" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
