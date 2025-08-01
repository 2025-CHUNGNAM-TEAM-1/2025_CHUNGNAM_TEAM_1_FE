import { useState, useEffect } from "react";
import { View } from "react-native";
import { useRouter } from 'expo-router';
import SVGLogo from "../assets/svgs/icons/SVGLogo";
import { getAccessToken, removeToken } from "../utils/tokenStorage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuthStore } from "../stores/useAuthStore";

export default function Index() {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const refreshExpiration = useAuthStore((state) => state.refreshExpiration);

    useEffect(() => {
        const checkToken = async () => {
            try {
                // await removeToken()
                const accessToken = await getAccessToken();
                console.log(accessToken)
                console.log(refreshExpiration)
                if (accessToken) {
                    router.replace("/(tabs)");
                    await useAuthStore.getState().effectiveness();
                } else {
                    router.replace("/my-stack-pages/splash");
                    await useAuthStore.getState().expiration();
                }
            } catch {
                router.replace("/my-stack-pages/splash");
                await useAuthStore.getState().expiration();
            } finally {
                setIsReady(true);
            }
        };
        checkToken();
    }, []);

    if (!isReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A3D9C3' }}>
                <SVGLogo />
                <LoadingSpinner />
            </View>
        );
    }

    return null;
}