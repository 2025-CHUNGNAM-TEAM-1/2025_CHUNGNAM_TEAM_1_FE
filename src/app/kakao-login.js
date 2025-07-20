import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import { API_BASE_URL, KAKAO_REDIRECT_URL } from "@env";
import { saveAccessToken, saveRefreshToken } from '../utils/tokenStorage';

const KAKAO_LOGIN_URL = `${API_BASE_URL}/oauth2/authorization/kakao`;

function parseTokens(url) {
    try {
        const urlObj = new URL(url);
        return {
            accessToken: urlObj.searchParams.get('accessToken'),
            refreshToken: urlObj.searchParams.get('refreshToken'),
        };
    } catch {
        return {};
    }
}

export default function KakaoLoginScreen() {
    const router = useRouter();

    const handleNavigationStateChange = async (navState) => {
        const { url } = navState;
        if (url.startsWith(`${KAKAO_REDIRECT_URL}`)) {
            const { accessToken, refreshToken } = parseTokens(url);
            if (accessToken && refreshToken) {
                await saveAccessToken(accessToken);
                await saveRefreshToken(refreshToken);
                router.replace('/signup');
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: KAKAO_LOGIN_URL }}
                onNavigationStateChange={handleNavigationStateChange}
                startInLoadingState
                renderLoading={() => (
                    <ActivityIndicator style={styles.loading} size="large" color="#333" />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
