import { useState, useEffect } from "react";
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import SVGLogo from "../assets/svgs/icons/SVGLogo";
import Signup from "./signup";
import Layout from "./(tabs)";

export default function Index() {
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 예시: 비동기 초기화(토큰 검사 등)
        setTimeout(() => {
            // 여기서 로그인 여부 판단 후 setState
            setIsReady(true);
            //   setIsLoggedIn(false); // true면 메인으로, false면 로그인으로 분기
        }, 5000);
    }, []);

    if (!isReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A3D9C3' }}>
                <SVGLogo />
            </View>
        );
    }

    if (isLoggedIn) {
        // 로그인 화면을 컴포넌트로 렌더
        return <Signup />;
    } else {
        return <Layout />;
    }
}