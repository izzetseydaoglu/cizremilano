'use client';

import { cerezSil } from '@sydsoft/base';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PageLogout() {
    const router = useRouter();
    useEffect(() => {
        cerezSil(null, 'auth');
        router.replace('/admin/giris');
    }, []);

    return null;
}
