import { Stack, useNavigation } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location'
import KakaoMap from '../../components/KakaoMap';
import LoadingSpinner from '../../components/LoadingSpinner';
import useBackButtonExit from '../../hooks/useBackButtonExit';
import SearchHeader from '../../components/SearchHeader';

export default function Home() {
    const navigation = useNavigation();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    useBackButtonExit();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('위치 권한이 거부되었습니다.');
                setLoading(false);
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLoading(false);
        })();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <SearchHeader
                            point={5000}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <Ionicons name="menu-outline" size={40} color="#000000" style={{ marginRight: 8 }} />
                        </TouchableOpacity>
                    ),
                    headerStyle: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#EEE' },
                }}
            />

            <View style={{ flex: 1 }}>
                <View style={styles.mapFake}>
                    <>
                        {errorMsg
                            ? <Text>{errorMsg}</Text>
                            : <View>
                                {location ? (
                                    <KakaoMap latitude={location.coords.latitude} longitude={location.coords.longitude} places={places} />
                                ) : (
                                    <LoadingSpinner />
                                )}
                            </View>
                        }
                    </>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        width: 250,
        borderRadius: 5,
        backgroundColor: '#D9D9D9',
        fontSize: 15,
        color: '000000',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    mapFake: {
        flex: 1,
        backgroundColor: '#ededed',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
});