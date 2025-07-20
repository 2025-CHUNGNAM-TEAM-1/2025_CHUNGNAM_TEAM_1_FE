import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import SVGDefaultProfile from '../assets/svgs/available_profiles/SVGDefaultProfile';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.sidebarHeader}>
        <SVGDefaultProfile width={38} height={38} />
        <Text style={styles.profileName}>김철수</Text>
        <Text style={styles.closeBtn} onPress={() => props.navigation.closeDrawer()}>닫기</Text>
      </View>
      <View style={styles.menuList}>
        <Text style={styles.menuItem}>내 계정</Text>
        <Text style={styles.loginInfo}>&gt;danwoong@gamil.com 으로 로그인</Text>
        <Text style={styles.menuItem}>환경설정</Text>
        <Text style={styles.menuItem}>고객센터</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          drawerType: 'front',
          drawerStyle: { width: '100%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, backgroundColor: '#FFFFFF' },
        }}
      >
        <Drawer.Screen name="(tabs)" options={{ drawerLabel: '홈' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderColor: '#000000',
    paddingHorizontal: 14,
  },
  profileName: {
    fontWeight: '500', flex: 1, fontSize: 20, color: '#000000', marginLeft: 13
  },
  closeBtn: {
    color: '#000000', fontWeight: '700', fontSize: 15,
  },
  menuList: { padding: 18 },
  menuItem: {
    fontSize: 20, color: '#000000', marginVertical: 11,
  },
  loginInfo: {
    fontSize: 13, color: '#898989', marginLeft: 4, marginBottom: 12, marginTop: -8,
  },
});