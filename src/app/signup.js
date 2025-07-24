import { View, Text, StyleSheet, Alert } from 'react-native';
import useInput from '../hooks/useInput';
import UserNameInput from '../components/UserNameInput';
import { checkUserNameDuplicate, registerProfile } from '../utils/memberApi';
import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useRouter } from 'expo-router';

export default function Signup() {
    const { value: userName, onChange } = useInput('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckAndRegister = async () => {
        setLoading(true);
        try {
            await checkUserNameDuplicate(userName);
            await registerProfile({ name: userName });
            router.replace('/(tabs)');
        } catch (e) {
            Alert.alert(e.message);
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading && <LoadingSpinner />}
            <Text style={styles.title}>사용자 이름 설정</Text>
            <UserNameInput
                value={userName}
                onChange={onChange}
                placeholder="사용자 이름 입력"
                onCheck={handleCheckAndRegister}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontFamily: 'Inknut Antiqua, serif',
        fontWeight: 900,
        fontSize: 30,
        color: '#264C44',
        marginTop: 100,
        marginBottom: 78,
        lineHeight: 30,
        textAlign: 'center',
    },
});