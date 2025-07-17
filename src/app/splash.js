import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import SVGProfile2Act from '../assets/svgs/available_profiles/SVGProfile2Act';

const splash = () => {
    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <SVGProfile2Act width={300} height={300}/>
            </View>
            <TouchableOpacity style={styles.kakaoButton}>
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
        marginBottom: 32,
        alignItems: 'center',
    },
    kakaoButton: {
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        paddingVertical: 10,
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

export default splash;