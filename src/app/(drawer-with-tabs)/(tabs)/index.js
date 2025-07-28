import { Stack, useNavigation, useRouter, usePathname } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import KakaoMap from '../../../components/KakaoMap';
import LoadingSpinner from '../../../components/LoadingSpinner';
import useBackButtonExit from '../../../hooks/useBackButtonExit';
import SearchHeader from '../../../components/SearchHeader';
import { getAllPlaces, searchPlaces } from '../../../utils/cultureApi';
import { usePlaceStore } from '../../../stores/usePlaceStore';
import { convertPlaces } from '../../../utils/convertPlaces';
import { userLocationStore } from '../../../stores/useLocationStore';
import { getProfile } from '../../../utils/profileApi';
import { useProfileStore } from '../../../stores/useProfileStore';

export default function Home() {
    const navigation = useNavigation();
    const router = useRouter();
    const pathname = usePathname();
    const { setProfile, profile } = useProfileStore();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searched, setSearched] = useState(false);
    const [initialPlaces, setInitialPlaces] = useState([]);
    const { setPlace, setSelectedPlace } = usePlaceStore();

    const mapPlaces = searched ? places : initialPlaces;

    useBackButtonExit();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await getProfile();
                setProfile(profileData);
                console.log(profile)
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
                setInitialPlaces(converted);
                console.log(initialPlaces)
                setPlace(converted);

                setPlaces([]);        // 빈 배열로 초기화 (검색 결과 없으므로)
                setSearched(false);
                // const data = await fetchAllPlacesInCheonan();
                // setPlaces(data);
                // setPlace(data)
            } catch (e) {
                Alert.alert(e.message);
                setErrorMsg('데이터를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const onBackPress = () => {
            if (pathname === '/' && searched) {
                setSearched(false);
                setPlaces([]);
                setPlace(initialPlaces);
                return true; // 이벤트 처리됨
            }
            return false; // 기본 동작
        };

        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => {
            subscription.remove();  // 이벤트 구독 해제
        };
    }, [searched, initialPlaces, setPlace, pathname]);

    const handleSearch = async (keyword) => {
        if (!keyword?.trim()) {
            Alert.alert('알림', '검색어를 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            const result = await searchPlaces(keyword);
            const converted = convertPlaces(result);
            console.log(converted)
            setPlaces(converted);
            setPlace(converted);
            setSearched(true);
        } catch (e) {
            Alert.alert('검색 오류', e.message);
            setSearched(false);
        } finally {
            setLoading(false);
        }
    };

    const renderPlaceItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.placeItem}
            onPress={() => {
                console.log(item)
                setSelectedPlace({ place: item });
                router.push(`/place/${item.id}`);
            }}
        >
            <Text style={styles.placeName}>{index + 1}. {item.name}</Text>
            <Text style={styles.placeAddress}>{item.road_address_name || item.address}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Stack.Screen
                options={{
                    headerTitle: () => <SearchHeader point={profile.currentPoints} onSearch={handleSearch} />,
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
            <View style={styles.container}>
                {errorMsg ? (
                    <Text style={styles.errorText}>{errorMsg}</Text>
                ) : loading && !places.length ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {location && (
                            <View style={styles.mapContainer}>
                                <KakaoMap
                                    latitude={location.coords.latitude}
                                    longitude={location.coords.longitude}
                                    places={mapPlaces}
                                />
                            </View>
                        )}

                        {searched && (  // 검색한 경우에만 리스트 표시
                            <View style={styles.listContainer}>
                                <FlatList
                                    data={places}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderPlaceItem}
                                    ListEmptyComponent={() => (
                                        <Text style={{ textAlign: 'center', marginTop: 20 }}>검색 결과가 없습니다.</Text>
                                    )}
                                    keyboardShouldPersistTaps="handled"
                                />
                            </View>
                        )}
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    mapContainer: { flex: 1, backgroundColor: '#ededed' },
    listContainer: { flex: 1, paddingHorizontal: 10, backgroundColor: '#fff' },
    placeItem: { paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
    placeName: { fontSize: 16, fontWeight: 'bold' },
    placeAddress: { fontSize: 14, color: '#555' },
    errorText: { padding: 20, textAlign: 'center', color: 'red' },
});