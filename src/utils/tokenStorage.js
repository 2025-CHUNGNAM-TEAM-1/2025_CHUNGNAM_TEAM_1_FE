import * as SecureStore from "expo-secure-store";

export async function saveAccessToken(token) {
  try {
    await SecureStore.setItem('access_token', token);
  } catch (error) {
    console.error('토큰 저장 실패:', error);
    throw error;
  }
}

export async function saveRefreshToken(token) {
  try {
    await SecureStore.setItem('refresh_token', token);
  } catch (error) {
    console.error('토큰 저장 실패:', error);
    throw error;
  }
}

export async function getAccessToken() {
  try {
    const accessToken = await SecureStore.getItem('access_token');
    return accessToken; 
  } catch (error) {
    console.error('토큰 조회 실패:', error);
    throw error;
  }
}

export async function getRefreshToken() {
  try {
    const refreshToken = await SecureStore.getItem('refresh_token');
    return refreshToken; 
  } catch (error) {
    console.error('토큰 조회 실패:', error);
    throw error;
  }
}

export async function removeToken() {
  try {
    await SecureStore.removeItem('refresh_token');
    await SecureStore.removeItem('access_token');
  } catch (error) {
    console.error('토큰 삭제 실패:', error);
    throw error;
  }
}