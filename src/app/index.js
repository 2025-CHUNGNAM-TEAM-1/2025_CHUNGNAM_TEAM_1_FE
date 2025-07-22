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

    useEffect(() => {
        const checkToken = async () => {
            try {
                const accessToken = await getAccessToken();
                console.log(accessToken)
                if (accessToken) {
                    await useAuthStore.getState().login();
                    router.replace("/(tabs)");
                } else {
                    await useAuthStore.getState().logout();
                    router.replace("/splash");
                }
            } catch {
                await useAuthStore.getState().logout();
                router.replace("/splash");
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