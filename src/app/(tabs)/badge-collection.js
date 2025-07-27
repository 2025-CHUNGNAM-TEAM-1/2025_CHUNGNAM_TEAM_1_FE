// BadgeListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// import { getStampStatus } from './api/stamp';
// import GoldBadge from './assets/badge_gold.svg';
// import GrayBadge from './assets/badge_gray.svg';

const BadgeListScreen = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 백엔드에서 스탬프 상태 불러오기
    const loadStamps = async () => {
      try {
        // const data = await getStampStatus();
        setPlaces(data); // [{ name, badge }]
      } catch (e) {
        // 에러 처리
      } finally {
        setLoading(false);
      }
    };
    loadStamps();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.placeText}>{item.name}</Text>
      {item.badge ? <GoldBadge width={32} height={32} /> : <GrayBadge width={32} height={32} />}
    </View>
  );

  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>나의 뱃지 모음</Text>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f2eb', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', alignSelf: 'center', marginVertical: 16 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#b9e3d1', marginBottom: 8, borderRadius: 8, alignItems: 'center' },
  placeText: { fontSize: 18 }
});

export default BadgeListScreen;

