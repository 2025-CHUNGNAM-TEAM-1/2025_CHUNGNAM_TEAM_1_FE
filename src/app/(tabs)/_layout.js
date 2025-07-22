import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#264C44',
        tabBarLabelStyle: { fontWeight: '600', fontSize: 11 },
        tabBarStyle: { backgroundColor: '#FFFFFF', borderTopWidth: 0.5, borderColor: '#BEBEBE' },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '홈',
          tabBarLabel: '홈',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="badge-ranking"
        options={{
          headerShown: false,
          title: '뱃지 랭킹',
          tabBarLabel: '뱃지 랭킹',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "trophy" : "trophy-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="badge-collection"
        options={{
          title: '나의 뱃지',
          tabBarLabel: '나의 뱃지',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "ribbon" : "ribbon-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile-edit"
        options={{
          title: '프로필 편집',
          tabBarLabel: '프로필 편집',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}