'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Check, Tag, Package, ChevronRight, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface YampiSKU {
    id: string;
    token: string;
    price: number;
    stock: number;
    title: string;
    variations: {
        name: string;
        value: string;
    }[];
}

interface YampiVariation {
    id: number;
    name: string;
    options: string[];
}

interface FullYampiProduct {
    id: string;
    name: string;
    description: string;
    slug: string;
    price: number;
    originalPrice: number;
    discountPercent: number;
    hasPromotion: boolean;
    images: string[];
    videos?: string[];
    brand: string;
    categories: string[];
    skus: YampiSKU[];
    variations: YampiVariation[];
    directCheckoutLink: string | null;
    personalizationEnabled: boolean;
}

export default function ProductContent({ product }: { product: FullYampiProduct }) {
    const [selectedSku, setSelectedSku] = useState<YampiSKU>(product.skus[0] || {} as YampiSKU);
    const [personalizationEnabled, setPersonalizationEnabled] = useState(false);
    const [personalizationType, setPersonalizationType] = useState('2 Iniciais');
    const [personalizationName, setPersonalizationName] = useState('');
    const [personalizationNote, setPersonalizationNote] = useState('');
    const [personalizationStyle, setPersonalizationStyle] = useState('Dourado');
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart } = useCart();
    const [activeImage, setActiveImage] = useState(product.images[0] || '');

    const personalizationPrices = {
        '2 Iniciais': 4.00,
        '1 Nome': 6.00,
        '2 Nomes': 10.00
    };

    const getPersonalizationPrice = () => {
        if (!personalizationEnabled) return 0;
        return personalizationPrices[personalizationType as keyof typeof personalizationPrices] || 0;
    };

    const currentPrice = (selectedSku.price || product.price) + getPersonalizationPrice();
    const hasDiscount = product.hasPromotion || (product.originalPrice > product.price);

    const handleAddToCart = () => {
        const cartId = `${product.id}-${selectedSku.id}${personalizationEnabled ? `-p-${personalizationName}-${personalizationStyle}` : ''}`;
        
        // Determinar o link de checkout correto para o SKU selecionado
        const storeAlias = 'alora-acessorios';
        const checkoutLink = selectedSku.token 
            ? `https://${storeAlias}.pay.yampi.com.br/r/${selectedSku.token}`
            : product.directCheckoutLink;

        addToCart({
            id: cartId,
            productId: product.id,
            token: selectedSku.token,
            name: product.name,
            price: currentPrice,
            image: product.images[0] || '',
            color: selectedSku.title || 'Padrão',
            directCheckoutLink: checkoutLink,
            personalizationEnabled,
            personalizationType: personalizationEnabled ? personalizationType : undefined,
            personalizationName: personalizationEnabled ? personalizationName : undefined,
            personalizationStyle: personalizationEnabled ? personalizationStyle : undefined,
            personalizationNote: personalizationEnabled ? personalizationNote : undefined,
            quantity: 1
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);

        // Se quiser levar direto ao checkout (Yampi standard)
        if (checkoutLink) {
            console.log('Redirecting to Checkout:', checkoutLink);
            window.location.href = checkoutLink;
        }
    };

    return (
        <div className="overflow-hidden">
            {/* Breadcrumbs / Metadata */}
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-400 mb-8">
                <span>{product.brand}</span>
                <ChevronRight className="w-3 h-3" />
                {product.categories.map((cat, i) => (
                    <span key={cat}>{cat}{i < product.categories.length - 1 ? ' / ' : ''}</span>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Image Gallery */}                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full lg:w-1/2"
                >
                    <div className="aspect-[4/5] bg-[#f9f9f9] border border-gray-100 flex items-center justify-center mb-6 relative overflow-hidden">
                        {hasDiscount && (
                            <div className="absolute top-4 left-4 z-20 bg-emerald-800 text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                                -{product.discountPercent}% OFF
                            </div>
                        )}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeImage || 'empty'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full relative"
                            >
                                {activeImage ? (
                                    <Image
                                        src={activeImage}
                                        alt={product.name}
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-contain p-4"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 uppercase tracking-widest text-[10px]">Sem Imagem</div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    {product.images && product.images.length > 1 && (
                        <div className="grid grid-cols-5 gap-3">
                            {product.images.map((img, idx) => (
                                img ? (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`aspect-square bg-[#f9f9f9] border flex items-center justify-center cursor-pointer transition relative overflow-hidden ${activeImage === img ? 'border-emerald-800 ring-1 ring-emerald-800' : 'border-gray-100 hover:border-gray-300'}`}
                                    >
                                        <Image src={img} alt={`${product.name} ${idx + 1}`} fill sizes="100px" className="object-contain p-1" />
                                    </div>
                                ) : null
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Product Details */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="w-full lg:w-1/2 flex flex-col"
                >
                    <h1 className="text-4xl font-serif font-light mb-4 text-gray-900">{product.name}</h1>
                    
                    <div className="flex items-baseline space-x-4 mb-8">
                        <span className="text-3xl font-serif text-emerald-900">
                            R$ {currentPrice.toFixed(2).replace('.', ',')}
                        </span>
                        {hasDiscount && (
                            <span className="text-lg text-gray-400 line-through font-light">
                                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                            </span>
                        )}
                    </div>

                    <div className="prose prose-sm prose-emerald text-gray-600 font-light tracking-wide mb-10 leading-relaxed border-t border-gray-100 pt-8">
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>

                    {/* Video Presentation */}
                    {product.videos && product.videos.length > 0 && (
                        <div className="mb-10 space-y-4">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Apresentação em Vídeo</h4>
                            <div className="aspect-video bg-gray-100 rounded-sm overflow-hidden border border-gray-100 shadow-inner">
                                <iframe 
                                    src={product.videos[0].replace('watch?v=', 'embed/')} 
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}

                    {/* Variations / SKUs */}
                    {product.skus.length > 1 && (
                        <div className="space-y-4 mb-8">
                            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Opções Disponíveis</label>
                            <div className="flex flex-wrap gap-2">
                                {product.skus.map((sku) => (
                                    <button
                                        key={sku.id}
                                        onClick={() => setSelectedSku(sku)}
                                        className={`px-4 py-2 border text-[10px] uppercase tracking-widest transition-all duration-300 ${selectedSku.id === sku.id 
                                            ? 'border-emerald-800 bg-emerald-50 text-emerald-900 font-bold' 
                                            : 'border-gray-200 text-gray-500 hover:border-gray-400 bg-white'}`}
                                    >
                                        {sku.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stock Info */}
                    <div className="flex items-center space-x-2 text-[10px] text-gray-400 uppercase tracking-widest mb-10">
                        <Package className="w-3 h-3" />
                        <span>{selectedSku.stock > 0 ? `Em estoque (${selectedSku.stock} unidades)` : 'Esgotado'}</span>
                    </div>

                    {/* Configurator */}
                    <div className="space-y-8 mb-10">
                        {/* Personalization Toggle */}
                        <div className="border border-gray-100 p-6 bg-emerald-50/20 rounded-sm">
                            <div className="flex items-center justify-between cursor-pointer" onClick={() => setPersonalizationEnabled(!personalizationEnabled)}>
                                <div>
                                    <h4 className="text-xs uppercase tracking-[0.15em] font-bold text-gray-900 flex items-center">
                                        <Tag className="w-3 h-3 mr-2 text-[#d4af37]" />
                                        Personalização
                                    </h4>
                                    <p className="text-[10px] text-gray-500 mt-1 font-light tracking-wide">Grave suas iniciais em folha de ouro ou prata.</p>
                                </div>
                                <div className={`w-10 h-5 rounded-full flex items-center p-1 transition-colors ${personalizationEnabled ? 'bg-emerald-800' : 'bg-gray-300'}`}>
                                    <div className={`w-3 h-3 rounded-full bg-white shadow-sm transform transition-transform ${personalizationEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </div>
                            </div>

                            {/* Personalization Form */}
                            {personalizationEnabled && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="mt-6 pt-6 border-t border-gray-100 space-y-4"
                                >
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-medium text-gray-500 mb-2">Quantos Nomes?</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {Object.entries(personalizationPrices).map(([type, price]) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setPersonalizationType(type)}
                                                    className={`py-3 border text-[9px] uppercase tracking-widest transition-all ${personalizationType === type
                                                        ? 'border-emerald-800 bg-emerald-50 text-emerald-900 font-bold'
                                                        : 'border-gray-200 text-gray-400 hover:border-gray-300 bg-white'}`}
                                                >
                                                    {type.split(' ')[1]} (+R${price})
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-medium text-gray-500 mb-2">As Iniciais ou Nome</label>
                                        <input
                                            type="text"
                                            value={personalizationName}
                                            onChange={(e) => setPersonalizationName(e.target.value)}
                                            placeholder="Digite aqui..."
                                            className="w-full bg-white border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-emerald-800 transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-medium text-gray-500 mb-2">Acabamento</label>
                                        <select
                                            value={personalizationStyle}
                                            onChange={(e) => setPersonalizationStyle(e.target.value)}
                                            className="w-full bg-white border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-emerald-800 transition rounded-none appearance-none"
                                        >
                                            <option value="Dourado">Folha de Ouro</option>
                                            <option value="Prata">Prata</option>
                                            <option value="Baixo Relevo">Baixo Relevo</option>
                                        </select>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => {
                                    handleAddToCart();
                                    // handleAddToCart already redirects if successful, but we can override it here if needed
                                }}
                                disabled={selectedSku.stock === 0}
                                className={`flex-1 py-5 uppercase tracking-[0.2em] text-[10px] font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg
                                    ${selectedSku.stock > 0 
                                        ? 'bg-gray-900 text-white hover:bg-black active:scale-[0.98]' 
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                            >
                                <MoveRight className="w-4 h-4" />
                                <span>Comprar Agora</span>
                            </button>

                            <button
                                onClick={() => {
                                    // Manual Add to Cart without redirection
                                    const cartId = `${product.id}-${selectedSku.id}${personalizationEnabled ? `-p-${personalizationName}-${personalizationStyle}` : ''}`;
                                    const storeAlias = 'alora-acessorios';
                                    const checkoutLink = selectedSku.token 
                                        ? `https://${storeAlias}.pay.yampi.com.br/r/${selectedSku.token}`
                                        : product.directCheckoutLink;

                                    addToCart({
                                        id: cartId,
                                        productId: product.id,
                                        token: selectedSku.token,
                                        name: product.name,
                                        price: currentPrice,
                                        image: product.images[0] || '',
                                        color: selectedSku.title || 'Padrão',
                                        directCheckoutLink: checkoutLink,
                                        personalizationEnabled,
                                        personalizationType: personalizationEnabled ? personalizationType : undefined,
                                        personalizationName: personalizationEnabled ? personalizationName : undefined,
                                        personalizationStyle: personalizationEnabled ? personalizationStyle : undefined,
                                        personalizationNote: personalizationEnabled ? personalizationNote : undefined,
                                        quantity: 1
                                    });
                                    setIsAdded(true);
                                    setTimeout(() => setIsAdded(false), 2000);
                                }}
                                disabled={selectedSku.stock === 0}
                                className={`flex-1 py-5 uppercase tracking-[0.2em] text-[10px] font-bold transition-all duration-300 flex items-center justify-center space-x-3 border
                                    ${isAdded 
                                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                                        : 'bg-white border-gray-200 text-gray-900 hover:border-gray-900 hover:bg-gray-50'}`}
                            >
                                {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                                <span>{isAdded ? 'Adicionado!' : 'Adicionar à Sacola'}</span>
                            </button>
                        </div>
                        
                        <p className="text-[10px] text-gray-400 text-center tracking-widest uppercase flex items-center justify-center">
                            <Check className="w-3 h-3 mr-2 text-emerald-600" />
                            Garantia de Qualidade Alora
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
