import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../stores/useAuthStore';

export default function AuthWatcher() {
    const refreshExpiration = useAuthStore((state) => state.refreshExpiration);
    const router = useRouter();

    useEffect(() => {
        if (!refreshExpiration) {
            router.replace('/splash');
        }
    }, [refreshExpiration]);

    return null;
}