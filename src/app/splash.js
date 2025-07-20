import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import SVGLogo from '../assets/svgs/icons/SVGLogo';
import handleKakaoLogin from '../services/kakao';

export default function splash() {
    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <SVGLogo />
            </View>
            <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
                <Text style={styles.kakaoText}>카카오톡으로 시작하기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A3D9C3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        marginBottom: 45,
        alignItems: 'center',
    },
    kakaoButton: {
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 24,
    },
    kakaoText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '100',
        fontFamily: 'Inter_100Thin',
        lineHeight: 20,
    },
});