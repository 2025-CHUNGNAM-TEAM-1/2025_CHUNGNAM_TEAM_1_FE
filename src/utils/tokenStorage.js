import * as SecureStore from "expo-secure-store";

export async function saveAccessToken(token) {
  try {
    await SecureStore.setItemAsync('access_token', token);
  } catch (error) {
    console.error('토큰 저장 실패:', error);
    throw error;
  }
}

export async function saveRefreshToken(token) {
  try {
    await SecureStore.setItemAsync('refresh_token', token);
  } catch (error) {
    console.error('토큰 저장 실패:', error);
    throw error;
  }
}

export async function getAccessToken() {
  try {
    const accessToken = await SecureStore.getItemAsync('access_token');
    return accessToken;
  } catch (error) {
    console.error('토큰 조회 실패:', error);
    throw error;
  }
}

export async function getRefreshToken() {
  try {
    const refreshToken = await SecureStore.getItemAsync('refresh_token');
    return refreshToken;
  } catch (error) {
    console.error('토큰 조회 실패:', error);
    throw error;
  }
}

export async function removeToken() {
  try {
    await SecureStore.deleteItemAsync('refresh_token');
    await SecureStore.deleteItemAsync('access_token');

    const accessToken = await SecureStore.getItemAsync('access_token');
    const refreshToken = await SecureStore.getItemAsync('refresh_token');
    console.log('삭제 후 access_token:', accessToken);
    console.log('삭제 후 refresh_token:', refreshToken);
  } catch (error) {
    console.error('토큰 삭제 실패:', error);
    throw error;
  }
}