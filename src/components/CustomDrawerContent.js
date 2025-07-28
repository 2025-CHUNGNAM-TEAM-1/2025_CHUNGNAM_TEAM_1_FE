import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useProfileStore } from '../stores/useProfileStore';
import { getProfileSVGById } from './getProfileSVGById';

export default function CustomDrawerContent(props) {
  const profile = useProfileStore((state) => state.profile);
  const imageId = profile?.imageId || 1;
  const ProfileSVG = getProfileSVGById(imageId);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* 상단 프로필 영역 */}
      <View style={styles.sidebarHeader}>
        {ProfileSVG && (
          <View style={styles.profileImgWrapper}>
            <ProfileSVG width={38} height={38} />
          </View>
        )}
        <Text style={styles.profileName}>{profile.userName}</Text>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Text style={styles.closeBtn}>닫기</Text>
        </TouchableOpacity>
      </View>

      {/* 메뉴 목록 */}
      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate('내계정')}>
          <Text style={styles.menuItemText}>내 계정</Text>
        </TouchableOpacity>

        <Text style={styles.loginInfo}>&gt; {profile.email} 으로 로그인</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate('환경설정')}>
          <Text style={styles.menuItemText}>환경설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate('고객센터')}>
          <Text style={styles.menuItemText}>고객센터</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
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
    fontWeight: '500',
    flex: 1,
    fontSize: 20,
    color: '#000000',
    marginLeft: 13,
  },
  closeBtn: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 15,
  },
  menuList: {
    padding: 18,
    flex: 1,
  },
  menuItem: {
    paddingVertical: 11,
  },
  menuItemText: {
    fontSize: 20,
    color: '#000000',
  },
  loginInfo: {
    fontSize: 13,
    color: '#898989',
    marginLeft: 4,
    marginBottom: 12,
    marginTop: -8,
  },
});