import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceInfo = ({ address }) => (
  <View style={styles.infoBox}>
    <Text style={styles.infoText}>{address}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoBox: { marginBottom: 18 },
});

export default PlaceInfo;