import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from '../components/CustomDrawerContent';
import AuthWatcher from "../components/AuthWatcher";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* 전역 상태 감시 */}
      <AuthWatcher /> 

      {/* 최상위 Drawer Navigator */}
      <Drawer
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          drawerType: 'front',
          drawerStyle: {
            width: '100%',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: '#FFFFFF',
          },
        }}
      >
        {/* Drawer 안에 (tabs) 그룹 연결 */}
        <Drawer.Screen name="(tabs)" options={{ drawerLabel: '홈' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}