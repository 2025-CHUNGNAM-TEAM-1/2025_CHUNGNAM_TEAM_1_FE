import { View, StyleSheet } from 'react-native';
import SVGLogo from '../assets/svgs/icons/SVGLogo';

export default function loading() {
    return (
        <View style={styles.container}>
            <SVGLogo />
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
});