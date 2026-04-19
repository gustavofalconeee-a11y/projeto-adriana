'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
        const password = (form.elements.namedItem('password') as HTMLInputElement).value.trim();

        console.log('Tentando login com:', email);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error('Erro no login:', data.error);
                setError(data.error || 'Erro ao fazer login.');
                setLoading(false);
                return;
            }

            console.log('Login bem-sucedido, redirecionando...');
            router.push('/admin');
            router.refresh();
        } catch (err) {
            console.error('Erro de rede:', err);
            setError('Erro de conexão. Tente novamente.');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
            <div className="w-full max-w-md bg-white p-8 border border-gray-100 shadow-sm">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-emerald-800 rounded-full flex items-center justify-center">
                        <Lock className="w-5 h-5 text-white" />
                    </div>
                </div>
                <h1 className="text-2xl font-serif text-center mb-8 text-gray-900">Alora Acessórios Admin</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 text-sm text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">E-mail ou Usuário</label>
                        <input
                            name="email"
                            type="text"
                            defaultValue="admin"
                            required
                            className="w-full px-4 py-3 border border-gray-200 focus:border-emerald-800 focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Senha</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 border border-gray-200 focus:border-emerald-800 focus:outline-none transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-4 uppercase tracking-[0.2em] text-sm font-semibold hover:bg-emerald-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Entrando...' : 'Entrar no Painel'}
                    </button>
                </form>
            </div>
        </div>
    );
}
