import { verifyAdmin } from '@/app/actions/auth';
import { redirect } from 'next/navigation';

export async function requireAuth() {
    const isAuth = await verifyAdmin();
    if (!isAuth) {
        redirect('/admin/login');
    }
}
