'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();
    const [isMounted, setIsMounted] = useState(false);
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [customerName, setCustomerName] = useState('');

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleCheckoutInit = () => {
        setIsNameModalOpen(true);
    };

    const handleConfirmCheckout = () => {
        // Yampi Checkout Link for Multiple Products
        // Format: https://alias.pay.yampi.com.br/r/TOKEN1:QTY1,TOKEN2:QTY2
        const yampiAlias = 'alora-acessorios';
        
        // Debug cart content
        console.log('Cart Items before checkout:', cart.map(i => ({ name: i.name, token: i.token })));

        // Filter items that have a token
        const checkoutItems = cart
            .filter(item => item.token)
            .map(item => `${item.token}:${item.quantity}`);

        if (checkoutItems.length > 0) {
            const checkoutTokens = checkoutItems.join(',');
            const checkoutUrl = `https://${yampiAlias}.pay.yampi.com.br/r/${checkoutTokens}`;
            
            console.log('Final Yampi Multi-Product URL:', checkoutUrl);
            setIsNameModalOpen(false);
            
            // Critical: ensure we redirect the current window to the combined URL
            window.location.href = checkoutUrl;
            return;
        }

        // Only fallback if no tokens
        if (!customerName.trim()) {
            setIsNameModalOpen(true);
            return;
        }

        setIsNameModalOpen(false);

        // Fallback to WhatsApp only if no tokens are found (unlikely)
        const phoneNumber = '5521999141006';
        let message = `PEDIDO - ALORA ACESSORIOS\n\n`;
        message += `Cliente: ${customerName}\n`;
        message += `\nProdutos:\n`;

        cart.forEach((item, index) => {
            message += `\nItem: ${item.name} (x${item.quantity})\n`;
            message += `Cor: ${item.color}\n`;
            if (item.personalizationEnabled) {
                message += `Personalizacao: ${item.personalizationType} - ${item.personalizationName} (${item.personalizationStyle})\n`;
            }
            message += `Preco: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
            if (index < cart.length - 1) message += `------------------\n`;
        });

        message += `\nTOTAL FINAL: R$ ${cartTotal.toFixed(2).replace('.', ',')}\n\n`;
        message += `Gostaria de finalizar minha compra ainda hoje!`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    if (!isMounted) return null;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
                <nav className="w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 sticky top-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex-1">
                                <Link href="/catalog" className="inline-flex items-center text-sm uppercase tracking-widest text-gray-500 hover:text-emerald-700 transition duration-300">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Catálogo
                                </Link>
                            </div>
                            <div className="flex-shrink-0 flex items-center justify-center flex-1">
                                <Link href="/">
                                    <span className="font-serif text-2xl tracking-widest text-[#d4af37] font-light uppercase">
                                        Alora <span className="text-emerald-800">Acessórios</span>
                                    </span>
                                </Link>
                            </div>
                            <div className="flex-1" />
                        </div>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex-grow w-full">
                    <div className="flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-24 h-24 bg-[#f9f9f9] rounded-full flex items-center justify-center text-gray-300 mb-4">
                            <ShoppingBag className="w-10 h-10" strokeWidth={1} />
                        </div>
                        <h1 className="text-3xl font-serif font-light text-gray-900">Sua Sacola está Vazia</h1>
                        <p className="text-gray-500 font-light tracking-wide max-w-md">
                            Parece que você ainda não adicionou nenhuma bolsa premium à sua sacola.
                        </p>
                        <div className="pt-8 w-full max-w-xs mx-auto">
                            <Link href="/catalog" className="w-full flex justify-center py-4 uppercase tracking-[0.2em] text-sm font-semibold bg-gray-900 text-white hover:bg-emerald-800 transition-all duration-300">
                                Ver Catálogo
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
            <nav className="w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-1">
                            <Link href="/catalog" className="inline-flex items-center text-sm uppercase tracking-widest text-gray-500 hover:text-emerald-700 transition duration-300">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">Continuar Comprando</span>
                                <span className="sm:hidden">Catálogo</span>
                            </Link>
                        </div>
                        <div className="flex-shrink-0 flex items-center justify-center flex-1">
                            <Link href="/">
                                <span className="font-serif text-xl sm:text-2xl tracking-widest text-[#d4af37] font-light uppercase whitespace-nowrap">
                                    Alora <span className="text-emerald-800 hidden xs:inline">Acessórios</span>
                                </span>
                            </Link>
                        </div>
                        <div className="flex flex-1 justify-end items-center">
                            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">{cartCount} Itens</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex-grow">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Items List */}
                    <div className="lg:w-2/3 space-y-10">
                        <h1 className="text-3xl font-serif font-light mb-10">Sua Sacola</h1>
                        <div className="divide-y divide-gray-100 border-t border-gray-100">
                            {cart.map((item) => (
                                <div key={item.id} className="py-8 flex gap-6 sm:gap-10 animate-fade-in">
                                    <div className="w-24 h-32 sm:w-32 sm:h-40 bg-[#f9f9f9] relative overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-[8px] uppercase tracking-widest text-gray-300">Sem Foto</div>
                                        )}
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-serif font-light text-gray-900 mb-1">{item.name}</h3>
                                                <p className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-3">COR: {item.color}</p>

                                                {item.personalizationEnabled && (
                                                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-sm mb-4">
                                                        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-800 mb-1">Peça Personalizada</p>
                                                        <p className="text-xs text-emerald-900">
                                                            <span className="font-semibold">{item.personalizationStyle}:</span> {item.personalizationName}
                                                        </p>
                                                        {item.personalizationNote && (
                                                            <p className="text-[10px] text-emerald-700 italic mt-1 font-light italic">"{item.personalizationNote}"</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-end mt-4">
                                            <div className="flex items-center border border-gray-200">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-3 py-1 hover:bg-gray-50 text-gray-500 transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-4 py-1 text-sm font-light text-gray-900 min-w-[40px] text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 py-1 hover:bg-gray-50 text-gray-500 transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <p className="text-lg font-light tracking-wide text-gray-900">
                                                R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-[#f9f9f9] p-8 sm:p-10 sticky top-32 border border-gray-100">
                            <h2 className="text-xl font-serif font-light mb-8">Resumo do Pedido</h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm font-light text-gray-600 tracking-wide">
                                    <span>Subtotal</span>
                                    <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                                </div>
                                <div className="flex justify-between text-sm font-light text-gray-600 tracking-wide">
                                    <span>Entrega</span>
                                    <span className="uppercase text-[10px] font-semibold tracking-widest text-[#d4af37]">Calculado no Checkout</span>
                                </div>
                                <div className="pt-6 mt-6 border-t border-gray-200 flex justify-between items-end">
                                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-900">Total</span>
                                    <span className="text-2xl font-serif text-emerald-800">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmCheckout}
                                className="w-full flex items-center justify-center space-x-3 bg-gray-900 text-white py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-emerald-800 transition-all duration-300 group shadow-xl shadow-gray-200"
                            >
                                <span>Finalizar Compra</span>
                                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-[10px] text-center text-gray-400 mt-6 uppercase tracking-[0.1em] font-light">
                                Pagamento seguro e atendimento personalizado via WhatsApp.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Name Capture Modal */}
            {isNameModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsNameModalOpen(false)} />
                    <div className="bg-white w-full max-w-md p-8 sm:p-10 shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 border border-gray-100">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-serif font-light text-gray-900 mb-2">Quase lá...</h3>
                            <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Como podemos te chamar?</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Seu Nome Completo</label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Ex: Maria Oliveira"
                                    className="w-full bg-gray-50 border-b-2 border-gray-100 px-0 py-3 text-lg font-light text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-emerald-700 transition-colors"
                                    autoFocus
                                />
                            </div>

                            <button
                                onClick={handleConfirmCheckout}
                                disabled={!customerName.trim()}
                                className="w-full bg-emerald-800 text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-emerald-900 disabled:bg-gray-200 disabled:text-gray-400 transition-all duration-300"
                            >
                                Confirmar e Finalizar
                            </button>

                            <button
                                onClick={() => setIsNameModalOpen(false)}
                                className="w-full text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors font-semibold"
                            >
                                Voltar para a sacola
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
