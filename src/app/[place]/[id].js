import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function PlaceDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>장소 상세 페이지 (ID: {id})</Text>
      {/* 상세 정보 표시 */}
    </View>
  );
}
