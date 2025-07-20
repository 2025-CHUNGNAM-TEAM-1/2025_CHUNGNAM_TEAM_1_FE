import { Linking } from 'react-native';
import {API_BASE_URL} from "@env";

const KAKAO_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/kakao`;

const handleKakaoLogin = () => {
  Linking.openURL(KAKAO_AUTH_URL);
};

export default handleKakaoLogin