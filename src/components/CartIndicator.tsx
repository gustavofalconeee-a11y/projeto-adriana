'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function CartIndicator() {
    const { cartCount } = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Link href="/cart" className="relative p-2 text-gray-800 hover:text-emerald-700 transition">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {isMounted && cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-emerald-800 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                </span>
            )}
        </Link>
    );
}
