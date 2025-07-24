import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceInfo = ({ address, openTime, phone }) => (
  <View style={styles.infoBox}>
    <Text style={styles.infoText}>{address}</Text>
    <Text style={styles.infoText}>{openTime}</Text>
    <Text style={styles.infoText}>전화번호: {phone}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoBox: { marginBottom: 18 },
  infoText: { fontSize: 15, color: '#444', lineHeight: 23 }
});

export default PlaceInfo;