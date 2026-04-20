'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Instagram } from 'lucide-react';
import Image from 'next/image';
import CartIndicator from '@/components/CartIndicator';
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
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans selection:bg-emerald-900 selection:text-white">

      {/* Navigation - Ultra Minimalista */}
      <nav className="fixed w-full bg-[#fafafa]/90 backdrop-blur-md z-50 border-b border-gray-200/50 transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center h-24">
            <div className="flex-1 flex items-center">
              <Link href="/catalog" className="group text-[10px] uppercase tracking-[0.3em] font-medium text-gray-500 hover:text-emerald-900 transition-colors hidden sm:flex items-center gap-4">
                <span className="w-8 h-px bg-gray-300 group-hover:bg-emerald-900 transition-colors"></span>
                Catálogo
              </Link>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center flex-1">
              <Link href="/">
                <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-gray-900 font-light uppercase whitespace-nowrap">
                  Alora
                </span>
              </Link>
            </div>

            <div className="flex flex-1 justify-end items-center space-x-6">
              <Link href="/catalog" className="sm:hidden text-[10px] uppercase tracking-widest font-medium text-gray-500">
                Catálogo
              </Link>
              <CartIndicator />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Estilo Editorial */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#fafafa]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] to-white/50 z-0"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#d4af37] text-[10px] uppercase tracking-[0.5em] font-medium mb-8 block"
          >
            Coleção Exclusiva
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl sm:text-7xl md:text-8xl font-light font-serif text-gray-900 mb-8 leading-[1.1] tracking-tight"
          >
            A Essência da <br />
            <span className="italic text-emerald-900">Elegância</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-px h-24 bg-gradient-to-b from-[#d4af37] to-transparent mb-8"
          ></motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-sm md:text-base text-gray-500 font-light mb-12 max-w-xl mx-auto tracking-[0.05em] leading-relaxed"
          >
            Descubra uma curadoria de peças premium que redefinem o conceito de luxo despretensioso. Excelência atemporal em cada detalhe.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link
              href="/catalog"
              className="group relative inline-flex items-center justify-center overflow-hidden border border-emerald-900 px-12 py-5"
            >
              <div className="absolute inset-0 w-full h-full bg-emerald-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              <span className="relative text-[10px] uppercase tracking-[0.3em] font-medium text-emerald-900 group-hover:text-white transition-colors duration-500 flex items-center gap-3">
                Explorar Coleção
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection - Galeria Clean */}
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-medium mb-4 block">Seleção Curada</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900">Destaques da<br />Temporada</h2>
          </div>
          <Link href="/catalog" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-emerald-900 font-medium pb-2">
            Ver Todas as Peças
            <div className="w-12 h-px bg-[#d4af37] group-hover:w-20 transition-all duration-500"></div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-x-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href={`/catalog/detalhes/${product.id}`} className="group block">
                <div className="w-full aspect-[3/4] bg-[#f4f4f4] mb-8 relative overflow-hidden flex items-center justify-center">
                  {/* Bordas sutis no hover para toque de luxo */}
                  <div className="absolute inset-4 border border-[#d4af37]/0 group-hover:border-[#d4af37]/30 transition-colors duration-700 z-20 pointer-events-none"></div>
                  
                  {((product as any).images && (product as any).images.length > 0) ? (
                    <Image
                      src={(product as any).images[0]}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  ) : (
                    <div className="relative z-10 text-gray-300 font-light text-[10px] tracking-[0.3em] uppercase">Em breve</div>
                  )}
                </div>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-serif font-light text-gray-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-sm tracking-widest text-gray-500 whitespace-nowrap">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Philosophy - Blockquote Imponente */}
      <section className="bg-emerald-950 text-white py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4af37] via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="w-px h-16 bg-[#d4af37]/50 mx-auto mb-12"></div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light mb-10 leading-[1.2]">
            "A verdadeira sofisticação reside na <span className="italic text-[#d4af37]">simplicidade absoluta</span> e na escolha implacável dos materiais."
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/60 font-light tracking-[0.2em] uppercase max-w-xl mx-auto">
            O Manifesto Alora
          </p>
        </div>
      </section>

      {/* Instagram - Minimalista e Clean */}
      <section className="py-32 px-6 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <Instagram className="text-emerald-900 w-8 h-8 mx-auto mb-8" strokeWidth={1} />
          <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-6">
            Acompanhe nossa jornada
          </h2>
          <p className="text-gray-500 font-light tracking-wide mb-12">
            Inspirações, bastidores e curadoria de estilo no nosso diário visual.
          </p>
          <a
            href="https://www.instagram.com/alora_acessorios_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-b border-emerald-900 pb-2 text-[10px] uppercase tracking-[0.3em] font-medium text-emerald-900 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300"
          >
            @alora_acessorios_
          </a>
        </div>
      </section>

      {/* Footer - Simétrico e Sóbrio */}
      <footer className="bg-[#fafafa] py-12 px-6 md:px-12">
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
