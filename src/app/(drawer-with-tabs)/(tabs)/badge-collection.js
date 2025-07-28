import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getStampStatus } from '../../../utils/stampApi';
import SVGBadgeAct from '../../../assets/svgs/icons/SVGBadgeAct';
import SVGBadgeInact from '../../../assets/svgs/icons/SVGBadgeInact';
import { useRouter } from "expo-router";
import { usePlaceStore } from '../../../stores/usePlaceStore';
import LoadingSpinner from '../../../components/LoadingSpinner';

const BadgeListScreen = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { setSelectedPlace, place, selectedPlace } = usePlaceStore();

  useEffect(() => {
    // 백엔드에서 스탬프 상태 불러오기
    const loadStamps = async () => {
      try {
        const data = await getStampStatus();
        setPlaces(data); // [{ name, badge }]
        setError(false);
      } catch (e) {
        // 에러 처리
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadStamps();
  }, []);

  const placeClick = (placeId) => {
    console.log(placeId)

    const selected = place.find(place => place.id === placeId || place.placeId === placeId);
    console.log(selected)
    if (selected) {
      setSelectedPlace({ place: selected });
      console.log(selectedPlace)
      router.push(`/place/${placeId}`);
    } else {
      // 예외: 데이터 누락 시 간단한 정보만 넘겨줄 수도 있음
      console.warn('상세 정보 없음:', placeId);
      router.push(`/place/${placeId}`);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => placeClick(item.placeId)}>
      <View style={styles.itemRow}>
        <Text style={styles.placeText} numberOfLines={1} ellipsizeMode="tail">
          {item.placeName}
        </Text>
        {item.collected ? (
          <SVGBadgeAct width={32} height={32} />
        ) : (
          <SVGBadgeInact width={32} height={32} />
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>장소 정보를 불러오지 못했습니다.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>나의 뱃지 모음</Text>
      <FlatList
        data={places}
        keyExtractor={(item) => item.placeId}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 16 },
  title: { fontSize: 30, fontWeight: '600', alignSelf: 'center', marginVertical: 16, marginTop: 30, color: '#264C44' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#A3D9C3', marginBottom: 8, borderRadius: 8, alignItems: 'center' },
  placeText: { fontSize: 18, maxWidth: 200 },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 30 }
});

export default BadgeListScreen;