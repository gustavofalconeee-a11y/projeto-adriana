import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'alora_acessorios_secret_key_2026';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const identifier = (body.email || '').trim();
        const password = (body.password || '').trim();

        if (!identifier || !password) {
            return NextResponse.json({ error: 'Preencha todos os campos.' }, { status: 400 });
        }

        let adminId = null;

        // LOGIN SUPER SIMPLES: admin / admin
        if (identifier === 'admin' && password === 'admin') {
            adminId = '00000000-0000-0000-0000-000000000000';
            console.log('Login admin/admin concedido');
        } else if (supabaseAdmin) {
            try {
                const { data, error } = await supabaseAdmin.rpc('verify_admin_login', {
                    p_identifier: identifier,
                    p_password: password,
                });

                if (!error && data && data.length > 0) {
                    adminId = data[0].id;
                }
            } catch (rpcError) {
                console.error('Supabase RPC Error:', rpcError);
            }
        }

        if (!adminId) {
            return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
        }

        const token = jwt.sign(
            { id: adminId, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        const response = NextResponse.json({ success: true });
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        return response;
    } catch (err: any) {
        console.error('Fatal Login Error:', err);
        return NextResponse.json({ error: 'Erro no servidor. Tente admin/admin.' }, { status: 500 });
    }
}
