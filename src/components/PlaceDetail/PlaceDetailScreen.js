import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PlaceInfo from './PlaceInfo';
import TimeEstimate from './TimeEstimate';
import StartButton from './StartButton';

const PlaceDetailScreen = ({
  imageUrl,
  placeName,
  address,
  openTime,
  phone,
  walkTime,
  bikeTime,
  busTime,
  onStart,
}) => {
  return (
    <View style={styles.container}>
      {/* 상단 아이콘과 타이틀 */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🏅</Text>
        <Text style={styles.placeName}>{placeName}</Text>
      </View>

      {/* 장소 대표 이미지 */}
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {/* 장소 상세 정보 */}
      <PlaceInfo
        address={address}
        openTime={openTime}
        phone={phone}
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
  headerIcon: { fontSize: 28 },
  placeName: { fontSize: 22, fontWeight: '700', marginTop: 4 },
  image: { width: '100%', height: 140, borderRadius: 12, marginVertical: 10 },
});

export default PlaceDetailScreen;