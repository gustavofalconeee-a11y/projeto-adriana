'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, LogOut, ChevronRight, Store } from 'lucide-react';
import { ReactNode } from 'react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Produtos', icon: Package },
];

export default function AdminSidebar({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    }

    return (
        <div className="min-h-screen bg-[#f9f9f9] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm fixed top-0 left-0 h-full z-30 hidden md:flex">
                {/* Logo */}
                <div className="px-6 py-8 border-b border-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center">
                            <Store size={16} className="text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-serif text-gray-900">Alora</p>
                            <p className="text-[9px] uppercase tracking-widest text-gray-400">Painel Admin</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-6 space-y-1">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href || pathname.startsWith(href + '/');
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all group ${isActive
                                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <Icon size={16} className={isActive ? 'text-emerald-700' : 'text-gray-400 group-hover:text-gray-600'} />
                                    <span className="tracking-wide">{label}</span>
                                </div>
                                {isActive && <ChevronRight size={14} className="text-emerald-500" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-50">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 px-4 py-2 text-xs text-gray-400 hover:text-gray-600 transition mb-2"
                    >
                        <Store size={14} />
                        <span className="tracking-wide">Ver Loja</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                        <LogOut size={16} />
                        <span className="tracking-wide">Sair</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between z-20 shadow-sm">
                <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 bg-emerald-800 rounded flex items-center justify-center">
                        <Store size={14} className="text-white" />
                    </div>
                    <span className="font-serif text-gray-900 text-sm">Alora Admin</span>
                </div>
                <div className="flex items-center space-x-3">
                    {navItems.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`p-2 rounded-lg transition ${pathname === href ? 'bg-emerald-50 text-emerald-800' : 'text-gray-400 hover:text-gray-600'}`}
                            title={label}
                        >
                            <Icon size={18} />
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                        title="Sair"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
                {children}
            </main>
        </div>
    );
}
