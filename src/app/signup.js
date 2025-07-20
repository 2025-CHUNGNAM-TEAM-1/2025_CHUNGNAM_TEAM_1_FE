import { View, Text, StyleSheet } from 'react-native';
import useInput from '../hooks/useInput';
import UserNameInput from '../components/UserNameInput';
import SVGDefaultProfile from '../assets/svgs/available_profiles/SVGDefaultProfile';

export default function Signup() {
    const { value: userName, onChange } = useInput('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>사용자 이름 설정</Text>
            <View style={{ marginBottom: 40 }}>
                <SVGDefaultProfile />
            </View>
            <UserNameInput
                value={userName}
                onChange={onChange}
                placeholder="사용자 이름 입력"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Inknut Antiqua, serif',
        fontWeight: 900,
        fontSize: 30,
        color: '#264C44',
        marginBottom: 78,
        lineHeight: 30,
        textAlign: 'center',
    },
});