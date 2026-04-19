'use client';

import { deleteProductAction } from '@/app/actions/products';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleDelete() {
        if (!confirm(`Tem certeza que deseja remover a bolsa "${name}" do estoque?`)) return;

        startTransition(async () => {
            try {
                await deleteProductAction(id);
                router.refresh();
            } catch (e) {
                alert('Erro ao deletar produto.');
            }
        });
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors disabled:opacity-50"
            title="Excluir Produto"
        >
            <Trash2 size={18} />
        </button>
    );
}
