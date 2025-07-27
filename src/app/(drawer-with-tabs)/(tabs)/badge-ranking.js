import { View, Text, StyleSheet } from 'react-native';


export default function Badge_ranking() {
  return (
    <View style={styles.container}>
      <View style={styles.pointBox}>
        <Text style={styles.pointBoxText}>5000P</Text>
      </View>

      <Text style={styles.title}>뱃지 랭킹</Text>

      {/* <RankingPodium /> */}

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          단웅이 님은 현재 16350명 중{'\n'}28위예요!
        </Text>
        <Text style={styles.encourageText}>
          조금만 더 힘내요!🔥
        </Text>
      </View>
    </View>
  );
};

const AVATAR_SIZE = 58;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0F0E0',
    alignItems: 'center',
    paddingTop: 32,
  },
  backButton: {
    position: 'absolute',
    left: 12,
    top: 28,
    zIndex: 10,
  },
  pointBox: {
    marginTop: 8,
    alignSelf: 'center',
    backgroundColor: '#A3D9C3',
    paddingHorizontal: 28,
    paddingVertical: 7,
    borderRadius: 10,
  },
  pointBoxText: {
    fontSize: 25,
    fontWeight: 600,
    color: '#264C44',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#264C44',
    marginTop: 18,
    marginBottom: 10,
    letterSpacing: -2,
  },
  podiumArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 18,
    width: '88%',
    height: 160,
  },
  podium: {
    width: 88,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#E0F7DE',
    shadowColor: '#A2D9B5',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    paddingBottom: 12,
    position: 'relative',
  },
  first: {
    height: 145,
    backgroundColor: '#F4FFDE',
    marginBottom: 0,
    zIndex: 2,
  },
  second: {
    height: 110,
    backgroundColor: '#CCF0FF',
    zIndex: 1,
    marginBottom: 18,
  },
  third: {
    height: 95,
    backgroundColor: '#FFE7D4',
    zIndex: 1,
    marginBottom: 27,
  },
  avatarPlaceholder: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#DDD',
    marginBottom: 12,
    marginTop: -32,
  },
  podiumName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
    color: '#49735A',
  },
  podiumScore: {
    fontSize: 13,
    fontWeight: '500',
    color: '#888',
  },
  medal: {
    fontSize: 18,
    marginTop: 2,
  },
  infoBox: {
    marginTop: 40,
    backgroundColor: '#EEFCEF',
    padding: 16,
    borderRadius: 10,
    width: '88%',
    alignItems: 'center',
  },
  infoBoxText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  encourageText: {
    fontSize: 16,
    color: '#FC7A1E',
    fontWeight: '700',
    textAlign: 'center',
  },
});