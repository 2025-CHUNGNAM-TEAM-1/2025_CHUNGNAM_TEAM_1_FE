import React, { useRef, useState, useCallback } from 'react';
import { View, Text, Animated, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function SearchHeader({ point = 5000 }) {
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');
    const slideAnim = useRef(new Animated.Value(0)).current;
    const inputRef = useRef(null);

    // useCallback으로 함수 메모이제이션
    const open = useCallback(() => {
        setVisible(true);
        Animated.timing(slideAnim, { toValue: 1, duration: 250, useNativeDriver: false }).start(() => {
            inputRef.current?.focus();
        });
    }, [slideAnim]);
    const close = useCallback(() => {
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start(() => {
            setVisible(false);
            setSearch('');
        });
    }, [slideAnim]);

    const inputWidth = slideAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 240] });

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {visible ? (
                <Animated.View style={{
                    width: inputWidth, marginRight: 8, height: 38, flexDirection: 'row', alignItems: 'center',
                    backgroundColor: '#D9D9D9', borderRadius: 5, overflow: 'hidden',
                }}>
                    <Ionicons name="search" size={22} color="#264C44" style={{ marginLeft: 8, marginRight: 2 }} />
                    <TextInput
                        ref={inputRef}
                        value={search}
                        onChangeText={setSearch}
                        placeholder="장소 검색"
                        style={{
                            flex: 1,
                            height: 38,        
                            fontSize: 15,
                            lineHeight: 22,      
                            color: '#000',
                            backgroundColor: 'transparent',
                            paddingHorizontal: 4,
                            paddingVertical: 0, 
                            textAlignVertical: 'center', 
                        }}
                        placeholderTextColor="rgba(0,0,0,0.65)"
                        returnKeyType="search"
                    />
                    <TouchableOpacity onPress={close} style={{ paddingHorizontal: 8, justifyContent: 'center' }}>
                        <Ionicons name="close" size={22} color="#888" />
                    </TouchableOpacity>
                </Animated.View>
            ) : (
                <>
                    <TouchableOpacity onPress={open} style={{ marginRight: 16 }}>
                        <Ionicons name="search" size={30} color="#666" />
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: '#A3D9C3',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}>
                        <Ionicons name="cash-outline" color="#EEFF00" size={22} style={{ marginRight: 6 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#264C44', letterSpacing: 1 }}>{point}P</Text>
                    </View>
                </>
            )}
        </View>
    );
}
export default React.memo(SearchHeader);