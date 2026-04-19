import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'alora_acessorios_secret_key_2026';

export async function verifyAdmin(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token')?.value;
        if (!token) return false;
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
        return decoded.role === 'admin';
    } catch {
        return false;
    }
}
