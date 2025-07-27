import { Stack } from 'expo-router';
import AuthWatcher from '../components/AuthWatcher';

export default function Layout() {
  return <>
    <AuthWatcher />
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  </>
}