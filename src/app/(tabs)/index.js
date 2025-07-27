import { Stack, useNavigation } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import KakaoMap from '../../components/KakaoMap';
import LoadingSpinner from '../../components/LoadingSpinner';
import useBackButtonExit from '../../hooks/useBackButtonExit';
import SearchHeader from '../../components/SearchHeader';
import { getAllPlaces, searchPlaces } from '../../utils/cultureApi';
import { usePlaceStore } from '../../stores/usePlaceStore';
import { convertPlaces } from '../../utils/convertPlaces';
import { userLocationStore } from '../../stores/useLocationStore';

export default function Home() {
    const navigation = useNavigation();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setPlace } = usePlaceStore();

    useBackButtonExit();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('위치 권한이 거부되었습니다.');
                    setLoading(false);
                    return;
                }

                const loc = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = loc.coords;
                setLocation(loc);
                userLocationStore.getState().setLocation({ latitude, longitude });

                const placeData = await getAllPlaces();
                const converted = convertPlaces(placeData);
                setPlaces(converted);
                setPlace(converted);
                console.log(converted)
            } catch (e) {
                Alert.alert(e.message);
                setErrorMsg('데이터를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async (keyword) => {
        if (!keyword) return;

        try {
            const result = await searchPlaces(keyword);
            console.log(result);
            // 필요하면 여기에 장소 상태 업데이트 코드 추가
        } catch (e) {
            Alert.alert(e.message);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Stack.Screen
                options={{
                    headerTitle: () => <SearchHeader point={5000} onSearch={handleSearch} />,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <Ionicons
                                name="menu-outline"
                                size={40}
                                color="#000000"
                                style={{ marginRight: 8 }}
                            />
                        </TouchableOpacity>
                    ),
                    headerStyle: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#EEE' },
                }}
            />

            <View style={{ flex: 1 }}>
                <View style={styles.mapFake}>
                    {errorMsg ? (
                        <Text>{errorMsg}</Text>
                    ) : loading ? (
                        <LoadingSpinner />
                    ) : (
                        location && <KakaoMap latitude={location.coords.latitude} longitude={location.coords.longitude} places={places} />
                    )}
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
        color: '#000000',
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