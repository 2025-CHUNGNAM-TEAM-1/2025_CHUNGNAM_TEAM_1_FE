import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../stores/useAuthStore';

export default function AuthWatcher() {
    const refreshExpiration = useAuthStore((state) => state.refreshExpiration);
    const router = useRouter();

    useEffect(() => {
        if (!refreshExpiration) {
            console.log("로그아웃 처리")
            router.replace('/my-stack-pages/splash');
        }
    }, [refreshExpiration]);

    return null;
}