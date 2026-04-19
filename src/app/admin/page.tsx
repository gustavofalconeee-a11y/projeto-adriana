import { requireAuth } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';
import { products as staticProducts } from '@/data/products';
import AdminSidebar from '@/components/AdminSidebar';
import { Users, ShoppingBag, DollarSign, Package, Trash2 } from 'lucide-react';
import { deleteOrderAction } from '@/app/actions/products';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    await requireAuth();

    let productsCount = 0;
    let ordersCount = 0;
    let totalRevenue = 0;
    let recentOrders: any[] = [];

    try {
        if (supabaseAdmin) {
            // Conta produtos no banco (ou usa dados estáticos como fallback)
            const { count: pCount } = await supabaseAdmin
                .from('products')
                .select('*', { count: 'exact', head: true });

            productsCount = pCount ?? staticProducts.length;

            // Busca pedidos
            const { data: orders, count: oCount } = await supabaseAdmin
                .from('orders')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .limit(10);

            ordersCount = oCount ?? 0;
            recentOrders = orders ?? [];
            totalRevenue = recentOrders.reduce((sum: number, o: any) => sum + (o.total_price || 0), 0);
        } else {
            productsCount = staticProducts.length;
        }

    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        productsCount = staticProducts.length;
    }

    const stats = [
        { label: 'Total de Bolsas', value: productsCount, icon: <Package size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Pedidos Gerados', value: ordersCount, icon: <ShoppingBag size={24} />, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Receita Total', value: `R$ ${totalRevenue.toFixed(2).replace('.', ',')}`, icon: <DollarSign size={24} />, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Ticket Médio', value: ordersCount > 0 ? `R$ ${(totalRevenue / ordersCount).toFixed(2).replace('.', ',')}` : 'R$ 0,00', icon: <Users size={24} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <AdminSidebar>
            <div className="p-4 sm:p-8 max-w-full overflow-x-hidden">
                <div className="mb-10">
                    <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-2">Visão Geral</h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-light tracking-wide">
                        Gerenciamento completo da Alora Acessórios.
                    </p>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-5 sm:p-6 border border-gray-100 shadow-sm rounded-xl hover:border-emerald-100 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <h2 className="text-lg font-serif text-gray-900">Últimos Pedidos</h2>
                            <p className="text-[10px] tracking-wider text-gray-500 font-light uppercase mt-1">Registros recentes no banco</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {recentOrders.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#f9f9f9] border-b border-gray-100">
                                    <tr className="whitespace-nowrap">
                                        <th className="px-6 py-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">ID</th>
                                        <th className="px-6 py-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Cliente</th>
                                        <th className="px-6 py-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest text-right">Valor</th>
                                        <th className="px-6 py-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest text-right">Ação</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentOrders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-[10px] font-mono text-gray-400">{order.id.slice(0, 8)}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900 line-clamp-1">{order.customer_name}</div>
                                                <div className="text-[10px] text-gray-400 font-light">{new Date(order.created_at).toLocaleDateString('pt-BR')}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 text-right font-light">
                                                R$ {(order.total_price || 0).toFixed(2).replace('.', ',')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <form action={async () => {
                                                    'use server';
                                                    await deleteOrderAction(order.id);
                                                }}>
                                                    <button
                                                        type="submit"
                                                        className="text-gray-300 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                                                        title="Excluir Pedido"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-16 text-center">
                                <ShoppingBag className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                                <p className="text-sm text-gray-400 font-light tracking-wide">Nenhum pedido registrado ainda.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminSidebar>
    );
}
