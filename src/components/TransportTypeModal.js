import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { useTransportStore } from '../stores/useTransportStore';

const TRANSPORT_TYPES = [
    { key: 'WALK', label: '도보' },
    { key: 'BICYCLE', label: '자전거' },
    { key: 'TRANSIT', label: '대중교통' },
];

export default function TransportTypeModal({ visible, onSelect, onClose }) {
    const setMode = useTransportStore(state => state.setMode);

    const selectMode = (key) => {
        setMode(key);
        onSelect(key);
    };
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.background}>
                <View style={styles.container}>
                    <Text style={styles.title}>어떤 이동수단을 이용할까요?</Text>
                    <View style={styles.options}>
                        {TRANSPORT_TYPES.map((type) => (
                            <Pressable
                                key={type.key}
                                style={styles.option}
                                onPress={() => selectMode(type.key)}
                            >
                                <View style={styles.radio} />
                                <Text style={styles.label}>{type.label}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    container: {
        backgroundColor: '#BFD3C1', padding: 28, borderRadius: 12, minWidth: 260
    },
    title: {
        fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 22
    },
    options: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    option: {
        alignItems: 'center', flexDirection: 'row', marginHorizontal: 8
    },
    radio: {
        width: 16, height: 16, borderRadius: 8, backgroundColor: '#e6e6e6', marginRight: 6
    },
    label: {
        fontSize: 16
    }
});