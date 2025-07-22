import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../stores/useAuthStore';

export default function AuthWatcher() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/splash');
        }
    }, [isLoggedIn, router]);

    return null;
}