import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const StartButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>출발하기</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { backgroundColor: '#A8CFB7', borderRadius: 9, padding: 16, alignItems: 'center' },
  text: { fontSize: 17, color: '#15533B', fontWeight: 'bold' }
});

export default StartButton;