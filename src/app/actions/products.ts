'use server'

import { getYampiProducts, getYampiProductById } from '@/lib/yampi';
import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Funções de busca (usadas no catálogo e home)
export async function fetchFeaturedProducts() {
    const products = await getYampiProducts();
    return products.slice(0, 6);
}

export async function fetchAllProducts() {
    return await getYampiProducts();
}

export async function fetchProductById(id: string) {
    return await getYampiProductById(id);
}

// Server Actions para Administração (CRUD via Supabase)

export async function createProductAction(prevState: any, formData: FormData) {
    console.log('--- Criando novo produto ---');
    
    try {
        const name = formData.get('name') as string;
        const price = parseFloat(formData.get('price') as string);
        const description = formData.get('description') as string;
        const imagesInput = formData.get('images') as string;
        const colorsInput = formData.get('colors') as string;
        const personalizationEnabled = formData.get('personalizationEnabled') === 'on';
        const directCheckoutLink = formData.get('linkUrl') as string;

        // Gerar ID amigável se não houver
        const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') + '-' + Math.random().toString(36).substring(2, 5);

        const data = {
            id,
            name,
            price,
            description,
            images: imagesInput.split(',').map(s => s.trim()).filter(s => s !== ''),
            colors: colorsInput.split(',').map(s => s.trim()).filter(s => s !== ''),
            personalization_enabled: personalizationEnabled,
            direct_checkout_link: directCheckoutLink,
        };

        const { error } = await supabaseAdmin.from('products').insert([data]);

        if (error) {
            console.error('Erro ao inserir no Supabase:', error);
            return { error: `Erro no banco: ${error.message}` };
        }

        console.log('Produto criado com sucesso!');
    } catch (err: any) {
        console.error('Erro fatal na action:', err);
        return { error: `Erro inesperado: ${err.message}` };
    }

    revalidatePath('/admin/products');
    revalidatePath('/catalog');
    redirect('/admin/products');
}

export async function updateProductAction(prevState: any, formData: FormData) {
    console.log('--- Atualizando produto ---');
    
    try {
        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const price = parseFloat(formData.get('price') as string);
        const description = formData.get('description') as string;
        const imagesInput = formData.get('images') as string;
        const colorsInput = formData.get('colors') as string;
        const personalizationEnabled = formData.get('personalizationEnabled') === 'on';
        const directCheckoutLink = formData.get('linkUrl') as string;

        const data = {
            name,
            price,
            description,
            images: imagesInput.split(',').map(s => s.trim()).filter(s => s !== ''),
            colors: colorsInput.split(',').map(s => s.trim()).filter(s => s !== ''),
            personalization_enabled: personalizationEnabled,
            direct_checkout_link: directCheckoutLink,
        };

        const { error } = await supabaseAdmin.from('products').update(data).eq('id', id);

        if (error) {
            console.error('Erro ao atualizar no Supabase:', error);
            return { error: `Erro no banco: ${error.message}` };
        }

        console.log('Produto atualizado com sucesso!');
    } catch (err: any) {
        console.error('Erro fatal na action:', err);
        return { error: `Erro inesperado: ${err.message}` };
    }

    revalidatePath('/admin/products');
    revalidatePath(`/catalog/detalhes/${id}`);
    redirect('/admin/products');
}

export async function deleteProductAction(id: string) {
    console.log('--- Excluindo produto ---', id);
    
    if (!supabaseAdmin) return;

    const { error } = await supabaseAdmin.from('products').delete().eq('id', id);
    
    if (error) {
        console.error('Erro ao excluir:', error);
    }
    
    revalidatePath('/admin/products');
}

export async function deleteOrderAction(id: string) {
    console.log('--- Excluindo pedido ---', id);
    
    if (!supabaseAdmin) return;

    const { error } = await supabaseAdmin.from('orders').delete().eq('id', id);
    
    if (error) {
        console.error('Erro ao excluir pedido:', error);
    }
    
    revalidatePath('/admin');
}
