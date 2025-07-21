import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import { API_BASE_URL, KAKAO_REDIRECT_URL } from "@env";
import { saveAccessToken, saveRefreshToken } from '../utils/tokenStorage';
import LoadingSpinner from '../components/LoadingSpinner';

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
    const [showWebView, setShowWebView] = useState(true);

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

    const handleHttpError = async (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;

        const { statusCode, description } = nativeEvent;

        let errorMsg = '로그인 중 오류가 발생했습니다. 다시 시도해 주세요.';

        try {
            const data = JSON.parse(description);
            if (data.message) errorMsg = data.message;
            console.log(errorMsg);
        } catch {
            if (statusCode === 401) errorMsg = '인증되지 않은 사용자입니다.';
            else if (statusCode === 403) errorMsg = '접근 권한이 없습니다.';
            else if (statusCode === 500) errorMsg = '서버 내부 에러가 발생했습니다.';
            else errorMsg = '알 수 없는 오류가 발생했습니다.';
        }
        router.back();
        setShowWebView(false);

        Alert.alert(
            '로그인 실패',
            errorMsg,
            [
                {
                    text: '확인',
                    onPress: () => { },
                }
            ],
            { cancelable: false }
        );
    };

    return showWebView ? (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: KAKAO_LOGIN_URL }}
                onNavigationStateChange={handleNavigationStateChange}
                onHttpError={handleHttpError}
                startInLoadingState
                renderLoading={() => (
                    <LoadingSpinner />
                )}
            />
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});