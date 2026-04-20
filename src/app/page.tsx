'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Instagram, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import CartIndicator from '@/components/CartIndicator';
import { fetchFeaturedProducts } from '@/app/actions/products';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    async function getProducts() {
      const products = await fetchFeaturedProducts();
      setFeaturedProducts(products);
    }
    getProducts();

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400;500;600&display=swap');

        :root {
          --gold: #d4af37;
          --gold-light: #e8cc6a;
          --dark: #0c1f14;
          --dark-mid: #122b1c;
          --emerald: #1a5c3a;
          --cream: #faf8f3;
        }

        .font-display  { font-family: 'Cormorant Garamond', serif; }
        .font-body     { font-family: 'Jost', sans-serif; }

        @keyframes gold-pulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        @keyframes line-in {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
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

        .hero-number {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
        }

        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }

        .noise-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        .grid-texture {
          background-image:
            linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .product-card-hover:hover .card-overlay {
          opacity: 1;
        }
        .product-card-hover:hover .card-cta {
          transform: translateY(0);
          opacity: 1;
        }
        .card-overlay {
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .card-cta {
          transform: translateY(12px);
          opacity: 0;
          transition: transform 0.4s ease 0.08s, opacity 0.4s ease 0.08s;
        }
        .img-zoom:hover img {
          transform: scale(1.06);
        }

        .corner-tl { top: 12px; left: 12px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); width: 20px; height: 20px; }
        .corner-tr { top: 12px; right: 12px; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); width: 20px; height: 20px; }
        .corner-bl { bottom: 12px; left: 12px; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); width: 20px; height: 20px; }
        .corner-br { bottom: 12px; right: 12px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); width: 20px; height: 20px; }
      `}</style>

      <div className="min-h-screen font-body bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">

        {/* ── NAVIGATION ─────────────────────────────────────────── */}
        <nav
          className="fixed w-full z-50 transition-all duration-700"
          style={{
            background: scrolled ? 'rgba(12,31,20,0.96)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(212,175,55,0.12)' : '1px solid transparent',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-14">
            <div className="flex items-center justify-between h-[88px]">

              {/* Left link */}
              <Link
                href="/catalog"
                className="text-[9px] uppercase tracking-[0.45em] font-medium transition-colors duration-300 hidden sm:inline-block"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                Catálogo
              </Link>

              {/* Logo — centered absolute */}
              <div className="absolute left-1/2 -translate-x-1/2 text-center">
                <Link href="/">
                  <p className="font-display text-xl tracking-[0.55em] font-light uppercase gold-text leading-none">Alora</p>
                  <p className="text-[7px] tracking-[0.8em] uppercase font-body font-light mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Acessórios
                  </p>
                </Link>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <Link href="/catalog" className="sm:hidden text-[9px] uppercase tracking-[0.3em] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Catálogo
                </Link>
                <CartIndicator />
              </div>

            </div>
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex items-center overflow-hidden noise-overlay grid-texture"
          style={{ background: 'linear-gradient(135deg, #0c1f14 0%, #0f2a1a 50%, #0a1c10 100%)' }}
        >
          {/* Gold radial glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '600px', height: '600px',
              top: '50%', left: '55%',
              transform: 'translate(-50%,-50%)',
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)',
            }}
          />

          {/* Vertical text — right edge */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3">
            <div className="w-px h-16" style={{ background: 'rgba(212,175,55,0.25)' }} />
            <span
              className="vertical-text text-[8px] tracking-[0.6em] uppercase font-light"
              style={{ color: 'rgba(212,175,55,0.35)', animation: 'float-y 7s ease-in-out infinite' }}
            >
              Nova Coleção · 2026
            </span>
            <div className="w-px h-16" style={{ background: 'rgba(212,175,55,0.25)' }} />
          </div>

          {/* Decorative large character */}
          <div
            className="absolute font-display font-light select-none pointer-events-none hidden lg:block"
            style={{
              fontSize: '40vw', lineHeight: 1,
              color: 'rgba(255,255,255,0.018)',
              right: '-8vw', bottom: '-5vw',
            }}
          >
            A
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 w-full pt-36 pb-24">
            <div className="grid lg:grid-cols-12 gap-12 items-center">

              {/* Text column */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>

                  {/* Eyebrow */}
                  <div className="flex items-center gap-4 mb-12">
                    <div className="h-px w-10" style={{ background: 'var(--gold)', animation: 'line-in 1s ease 0.3s both' }} />
                    <span className="text-[9px] uppercase tracking-[0.55em] font-medium" style={{ color: 'var(--gold)' }}>
                      Coleção Atemporal · 2026
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-display font-light text-white leading-[0.88] mb-10" style={{ fontSize: 'clamp(4rem, 9vw, 7.5rem)' }}>
                    Eleve<br />
                    o seu<br />
                    <span className="italic gold-text">Estilo</span>
                  </h1>

                  {/* Divider */}
                  <div className="w-full h-px mb-10" style={{ background: 'rgba(255,255,255,0.08)' }} />

                  {/* Body */}
                  <p className="text-sm font-light leading-relaxed max-w-md mb-14" style={{ color: 'rgba(255,255,255,0.42)', letterSpacing: '0.05em' }}>
                    Bolsas premium que unem elegância atemporal e design minimalista. Cada peça, uma obra de arte construída com obsessão pela excelência.
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-6">
                    <Link href="/catalog" className="group flex items-center gap-5">
                      <div
                        className="w-14 h-14 flex items-center justify-center transition-all duration-500"
                        style={{ border: '1px solid rgba(212,175,55,0.35)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      >
                        <ArrowRight className="w-4 h-4 transition-colors duration-300" style={{ color: 'var(--gold)' }} />
                      </div>
                      <span
                        className="text-[9px] uppercase tracking-[0.45em] font-medium transition-colors duration-300"
                        style={{ color: 'rgba(255,255,255,0.55)' }}
                      >
                        Explorar Coleção
                      </span>
                    </Link>
                  </div>

                </motion.div>
              </div>

              {/* Decorative frame — right */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, delay: 0.3 }}
                className="lg:col-span-5 hidden lg:flex items-center justify-center"
              >
                <div className="relative w-80 h-[460px]">
                  {/* Outer frame */}
                  <div className="absolute inset-0" style={{ border: '1px solid rgba(212,175,55,0.15)' }} />
                  {/* Inner offset frame */}
                  <div className="absolute inset-5" style={{ border: '1px solid rgba(212,175,55,0.08)' }} />

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                    <div className="w-px h-14" style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.5))' }} />
                    <div className="w-6 h-px" style={{ background: 'var(--gold)', opacity: 0.4 }} />
                    <span className="font-display italic font-light text-5xl" style={{ color: 'rgba(255,255,255,0.04)', letterSpacing: '0.3em' }}>
                      ALORA
                    </span>
                    <div className="w-6 h-px" style={{ background: 'var(--gold)', opacity: 0.4 }} />
                    <span className="text-[7px] uppercase tracking-[0.8em]" style={{ color: 'rgba(212,175,55,0.3)' }}>
                      Est. 2024
                    </span>
                    <div className="w-px h-14" style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.5), transparent)' }} />
                  </div>

                  {/* Corner accents */}
                  <div className="absolute corner-tl" /><div className="absolute corner-tr" />
                  <div className="absolute corner-bl" /><div className="absolute corner-br" />
                </div>
              </motion.div>

            </div>
          </div>

          {/* Scroll nudge */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
            <span className="text-[7px] uppercase tracking-[0.6em]" style={{ color: 'rgba(255,255,255,0.25)' }}>Rolar</span>
            <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.45), transparent)' }} />
          </div>
        </section>

        {/* ── FEATURED COLLECTION ─────────────────────────────────── */}
        <section className="py-32 px-6 lg:px-14" style={{ background: 'var(--cream)' }}>
          <div className="max-w-7xl mx-auto">

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20 pb-8" style={{ borderBottom: '1px solid #e5e0d5' }}>
              <div>
                <span className="text-[9px] uppercase tracking-[0.55em] font-medium block mb-3" style={{ color: 'var(--gold)' }}>
                  Seleção Curada
                </span>
                <h2 className="font-display font-light text-gray-900 leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                  Destaques da<br /><em>Temporada</em>
                </h2>
              </div>
              <Link
                href="/catalog"
                className="group hidden sm:inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.45em] font-medium transition-colors duration-300 text-gray-400 hover:text-emerald-800"
              >
                <span>Ver Tudo</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.14, ease: 'easeOut' }}
                >
                  <Link href={`/catalog/detalhes/${product.id}`} className="group block product-card-hover">

                    {/* Index row */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="hero-number text-4xl font-light" style={{ color: '#e5e0d5' }}>
                        0{index + 1}
                      </span>
                      <div className="flex-1 h-px" style={{ background: '#e5e0d5' }} />
                    </div>

                    {/* Image container */}
                    <div
                      className="relative w-full aspect-[3/4] overflow-hidden img-zoom mb-7"
                      style={{ background: '#fff', border: '1px solid #ede8df' }}
                    >
                      {/* Overlay */}
                      <div className="card-overlay absolute inset-0 z-10 flex flex-col items-center justify-end pb-7"
                        style={{ background: 'linear-gradient(to top, rgba(12,31,20,0.72) 0%, transparent 60%)' }}
                      >
                        <span className="card-cta text-[8px] uppercase tracking-[0.55em] font-medium text-white">
                          Ver Detalhes
                        </span>
                      </div>

                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          priority
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-8 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[9px] uppercase tracking-[0.4em] text-gray-300">
                          Em breve
                        </div>
                      )}

                      {/* Gold corner accents */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-2.5 left-2.5 w-5 h-5" style={{ borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
                        <div className="absolute top-2.5 right-2.5 w-5 h-5" style={{ borderTop: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />
                        <div className="absolute bottom-2.5 left-2.5 w-5 h-5" style={{ borderBottom: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
                        <div className="absolute bottom-2.5 right-2.5 w-5 h-5" style={{ borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="font-display font-light text-xl text-gray-900 group-hover:text-emerald-800 transition-colors duration-300 mb-2 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-[11px] tracking-[0.3em] text-gray-400 font-medium">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-14 text-center sm:hidden">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.45em] font-medium text-gray-600 hover:text-emerald-800 transition-colors pb-1"
                style={{ borderBottom: '1px solid currentColor' }}
              >
                <span>Ver Toda a Coleção</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── BRAND PHILOSOPHY ────────────────────────────────────── */}
        <section
          className="relative py-36 px-6 lg:px-14 overflow-hidden noise-overlay"
          style={{ background: 'var(--dark)' }}
        >
          {/* Grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(rgba(212,175,55,0.03) 0px, rgba(212,175,55,0.03) 1px, transparent 1px, transparent 72px), repeating-linear-gradient(90deg, rgba(212,175,55,0.03) 0px, rgba(212,175,55,0.03) 1px, transparent 1px, transparent 72px)',
            }}
          />

          {/* Giant background word */}
          <div
            className="absolute font-display font-light italic select-none pointer-events-none hidden md:block"
            style={{
              fontSize: '28vw', color: 'rgba(255,255,255,0.02)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap',
            }}
          >
            Alora
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Gold ornament */}
            <div className="flex items-center justify-center gap-5 mb-16">
              <div className="h-px w-16" style={{ background: 'rgba(212,175,55,0.3)' }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'var(--gold)' }} />
              <div className="h-px w-16" style={{ background: 'rgba(212,175,55,0.3)' }} />
            </div>

            <blockquote className="font-display font-light text-white leading-snug mb-10" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.6rem)' }}>
              "Mais do que um acessório,<br />
              <em style={{ color: 'var(--gold)' }}>é uma declaração</em><br />
              de luxo despretensioso."
            </blockquote>

            <p className="text-sm font-light leading-relaxed max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em' }}>
              Na Alora, minimalismo não é ausência — é intenção. Cada peça nasce de materiais selecionados, linhas precisas e excelência artesanal.
            </p>

            <div className="flex items-center justify-center gap-5 mt-16">
              <div className="h-px w-16" style={{ background: 'rgba(212,175,55,0.3)' }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'var(--gold)' }} />
              <div className="h-px w-16" style={{ background: 'rgba(212,175,55,0.3)' }} />
            </div>
          </div>
        </section>

        {/* ── INSTAGRAM CTA ───────────────────────────────────────── */}
        <section className="py-28 px-6 lg:px-14" style={{ background: 'var(--cream)' }}>
          <div className="max-w-3xl mx-auto">
            <div
              className="relative p-14 sm:p-20 text-center"
              style={{ border: '1px solid #ddd8cc' }}
            >
              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-9 h-9" style={{ borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
              <div className="absolute top-4 right-4 w-9 h-9" style={{ borderTop: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />
              <div className="absolute bottom-4 left-4 w-9 h-9" style={{ borderBottom: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
              <div className="absolute bottom-4 right-4 w-9 h-9" style={{ borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />

              <Instagram className="w-5 h-5 mx-auto mb-8" style={{ color: 'var(--gold)' }} strokeWidth={1.5} />

              <h2 className="font-display font-light text-gray-900 leading-[0.9] mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Curadoria Diária<br />
                no <em style={{ color: 'var(--emerald)' }}>Instagram</em>
              </h2>

              <p className="text-sm font-light leading-relaxed max-w-xs mx-auto mb-10" style={{ color: '#9c9484', letterSpacing: '0.04em' }}>
                Lançamentos exclusivos e inspirações de estilo na nossa rede oficial.
              </p>

              <a
                href="https://www.instagram.com/alora_acessorios_/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 transition-all duration-300 px-10 py-4"
                style={{ background: 'var(--dark)', color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--emerald)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--dark)'; }}
              >
                <span className="text-[8px] uppercase tracking-[0.55em] font-medium">@alora_acessorios_</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ color: 'var(--gold)' }} />
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <footer
          className="py-16 px-6 lg:px-14"
          style={{ background: 'var(--dark)', borderTop: '1px solid rgba(212,175,55,0.1)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="text-center md:text-left">
              <p className="font-display text-sm uppercase tracking-[0.55em] font-light mb-1.5" style={{ color: 'var(--gold)' }}>
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
              <a
                href="https://www.instagram.com/alora_acessorios_/"
                target="_blank"
                rel="noreferrer"
                className="text-[8px] uppercase tracking-[0.45em] font-medium transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
              >
                Instagram
              </a>
              <a
                href="https://wa.me/5521999141006"
                target="_blank"
                rel="noreferrer"
                className="text-[8px] uppercase tracking-[0.45em] font-medium transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
              >
                WhatsApp
              </a>
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}
