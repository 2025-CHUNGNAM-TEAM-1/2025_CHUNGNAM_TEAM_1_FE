import EncryptedStorage from 'react-native-encrypted-storage';

export async function saveAccessToken(token) {
  try {
    await EncryptedStorage.setItem('access_token', token);
  } catch (error) {
    console.error('토큰 저장 실패:', error);
    throw error;
  }
}

export async function saveRefreshToken(token) {
  try {
    await EncryptedStorage.setItem('refresh_token', token);
  } catch (error) {
    console.error('토큰 저장 실패:', error);
    throw error;
  }
}

export async function getAccessToken() {
  try {
    const accessToken = await EncryptedStorage.getItem('access_token');
    return accessToken; 
  } catch (error) {
    console.error('토큰 조회 실패:', error);
    throw error;
  }
}

export async function getRefreshToken() {
  try {
    const refreshToken = await EncryptedStorage.getItem('refresh_token');
    return refreshToken; 
  } catch (error) {
    console.error('토큰 조회 실패:', error);
    throw error;
  }
}

export async function removeToken() {
  try {
    await EncryptedStorage.removeItem('refresh_token');
    await EncryptedStorage.removeItem('access_token');
  } catch (error) {
    console.error('토큰 삭제 실패:', error);
    throw error;
  }
}