import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from 'expo-router';
import SVGLogo from "../assets/svgs/icons/SVGLogo";
import { getAccessToken } from "../utils/tokenStorage";

export default function Index() {
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const accessToken = await getAccessToken();
                router.replace(accessToken ? "/(tabs)" : "/splash");
            } catch {
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
                <ActivityIndicator style={{ marginTop: 24 }} size="large" />
            </View>
        );
    }

    // 분기 시 이미 라우터로 이동하므로 이 부분 불필요.
    return null;
}