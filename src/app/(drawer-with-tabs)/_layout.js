import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from '../../components/CustomDrawerContent';

export default function TabsLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            backgroundColor: '#FFF',
          },
        }}>
        <Drawer.Screen name="index" options={{ drawerLabel: '시작 페이지' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}