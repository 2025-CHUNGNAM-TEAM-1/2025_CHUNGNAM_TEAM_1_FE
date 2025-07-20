import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RankingPodium = () => {
  // 랭킹 데이터 예시
  const podium = [
    { rank: 2, name: '수뭉이', score: 15829, medal: '🥈' },
    { rank: 1, name: '크놈이', score: 19325, medal: '🥇' },
    { rank: 3, name: '뷰리', score: 14880, medal: '🥉' },
  ];
  // 2, 1, 3 순서로 표시 (이미지 참고)
  const displayOrder = [0, 1, 2];

  return (
    <View style={styles.row}>
      {displayOrder.map(i => (
        <View
          key={podium[i].rank}
          style={[
            styles.podium,
            podium[i].rank === 1 && styles.first,
            podium[i].rank === 2 && styles.second,
            podium[i].rank === 3 && styles.third
          ]}
        >
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.name}>{podium[i].name}</Text>
          <Text style={styles.score}>{podium[i].score}P</Text>
          <View style={styles.medalRow}>
            <Text style={styles.medal}>{podium[i].medal}</Text>
            <Text style={styles.rankNum}>{podium[i].rank}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const AVATAR_SIZE = 52;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '92%',
    marginVertical: 34,
    gap: 0, // 최대한 붙도록
  },
  podium: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#E0F7EF', // 밝은 통일된 민트톤
    borderColor: '#c0e6da',
    borderWidth: 2,
    borderRadius: 14,
    marginHorizontal: -4, // 붙여주기 (음수 마진)
    paddingHorizontal: 8,
    paddingBottom: 10,
    width: 95,
    position: 'relative',
    elevation: 4,
    shadowColor: '#bcded3',
    shadowOpacity: 0.16,
    shadowRadius: 4,
  },
  first: {
    height: 160,
    marginBottom: 0,
  },
  second: {
    height: 120,
    marginBottom: 20,
  },
  third: {
    height: 99,
    marginBottom: 38,
  },
  avatarPlaceholder: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#c0e6da',
    marginBottom: 10,
    marginTop: -28,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#384B45',
    marginBottom: 2,
  },
  score: {
    fontSize: 14,
    color: '#73a299',
    marginBottom: 7,
    fontWeight: '600',
  },
  medalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  medal: {
    fontSize: 20,
    marginRight: 2,
  },
  rankNum: {
    fontSize: 20,
    fontWeight: '800',
    color: '#bbb',
  },
});

export default RankingPodium;
