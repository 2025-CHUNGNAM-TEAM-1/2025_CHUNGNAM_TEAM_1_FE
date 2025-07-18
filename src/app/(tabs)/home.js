import { Stack, useNavigation } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location'
import KakaoMap from '../../components/KakaoMap';

export default function Home() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('위치 권한이 거부되었습니다.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="장소 검색"
              placeholderTextColor="rgba(0, 0, 0, 0.65)"
              style={styles.searchInput}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Ionicons name="menu-outline" size={40} color="#000000" style={{ marginRight: 8 }} />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#EEE' },
        }}
      />

      <View style={{ flex: 1 }}>
        <View style={styles.mapFake}>
          <>
            {errorMsg
              ? <Text>{errorMsg}</Text>
              : <View>
                {location ? (
                  <KakaoMap latitude={location.coords.latitude} longitude={location.coords.longitude} />
                ) : (
                  <Text>위치를 가져오는 중입니다...</Text>
                )}
              </View>
            }
          </>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    width: 250,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    fontSize: 15,
    color: '000000',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  mapFake: {
    flex: 1,
    backgroundColor: '#ededed',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});
