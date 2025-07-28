import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PlaceInfo from './PlaceInfo';
import TimeEstimate from './TimeEstimate';
import StartButton from './StartButton';
import { getStampStatusByPlaceId } from '../../utils/stampApi';
import useBadgeStore from '../../stores/useBadgeStore';

const PlaceDetailScreen = ({
  placeId,
  imageUrl,
  placeName,
  address,
  walkTime,
  bikeTime,
  busTime,
  onStart,
}) => {

  const { setIsBadgeActive } = useBadgeStore();

  useEffect(() => {
    if (!placeId) return; // placeId 없으면 조회 안함

    const fetchStampStatus = async () => {
      try {
        const status = await getStampStatusByPlaceId(placeId);
        setIsBadgeActive(status.collected);
      } catch (err) {
        setError('스탬프 상태를 불러오는데 실패했습니다.');
        console.error(err);
      }
    };

    fetchStampStatus();
  }, [placeId]);

  return (
    <View style={styles.container}>
      {/* 상단 아이콘과 타이틀 */}
      <View style={styles.header}>
        <Text style={styles.placeName}>{placeName}</Text>
      </View>

      {/* 장소 대표 이미지 */}
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {/* 장소 상세 정보 */}
      <PlaceInfo
        address={address}
      />

      {/* 예상 소요 시간 영역 */}
      <TimeEstimate
        walkTime={walkTime}
        bikeTime={bikeTime}
        busTime={busTime}
      />

      {/* 출발하기 버튼 */}
      <StartButton onPress={onStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 14 },
  header: { alignItems: 'center', marginBottom: 8 },
  placeName: { fontSize: 22, fontWeight: '700', marginTop: 4 },
  image: { width: '100%', height: 140, borderRadius: 12, marginVertical: 10 },
});

export default PlaceDetailScreen;