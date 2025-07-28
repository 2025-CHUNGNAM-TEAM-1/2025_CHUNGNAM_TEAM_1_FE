import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimeEstimate = ({ walkTime, bikeTime, busTime }) => (
  <View style={styles.timeBox}>
    <View style={styles.timeList}>
      <View style={styles.timeRow}>
        <Text style={styles.icon}>🚶‍♂️</Text>
        <Text style={styles.method}>도보</Text>
        <Text style={styles.time}>{walkTime}</Text>
      </View>
      <View style={styles.timeRow}>
        <Text style={styles.icon}>🚴‍♂️</Text>
        <Text style={styles.method}>자전거</Text>
        <Text style={styles.time}>{bikeTime}</Text>
      </View>
      <View style={styles.timeRow}>
        <Text style={styles.icon}>🚌</Text>
        <Text style={styles.method}>버스</Text>
        <Text style={[styles.time, { flexWrap: 'wrap', width: '70%' }]} numberOfLines={9}>{busTime}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  timeBox: { backgroundColor: '#f4f7f3', borderRadius: 10, padding: 12, marginBottom: 20 },
  timeList: {},
  timeRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 2 },
  icon: { fontSize: 19, marginRight: 8 },
  method: { flex: 1, fontSize: 15 },
  time: { fontSize: 15, color: '#222' }
});

export default TimeEstimate;