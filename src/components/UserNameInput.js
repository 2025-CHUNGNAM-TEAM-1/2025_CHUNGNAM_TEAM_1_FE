import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function UserNameInput({ value, onChange, placeholder, onCheck }) {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor="#rgba(0, 0, 0, 0.7)"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TouchableOpacity style={styles.btn} onPress={() => onCheck(value)}>
                <Text style={styles.btnText}>확인</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        paddingHorizontal: 8,
        height: 52,
        width: 338,
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        fontFamily: 'Inknut Antiqua, serif',
        paddingVertical: 0,
        paddingHorizontal: 8,
        fontSize: 20,
        color: '#000000',
        backgroundColor: 'transparent',
    },
    btn: {
        backgroundColor: '#A3D9C3',
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 14,
        marginLeft: 4,
        borderColor: '#264C44',
        borderWidth: 1,
    },
    btnText: {
        fontFamily: 'Inknut Antiqua, serif',
        fontSize: 20,
        color: '#264C44',
        fontWeight: '900',
    },
});