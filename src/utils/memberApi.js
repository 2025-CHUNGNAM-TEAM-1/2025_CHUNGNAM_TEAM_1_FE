import axios from 'axios';
import { API_BASE_URL } from "@env";

export async function checkUserNameDuplicate(userName, access_token) {
    try {
        console.log('중복 실행')
        console.log(userName)
        console.log(access_token)
        console.log(`${API_BASE_URL}/members/check-name?name=${encodeURIComponent(userName)}`)
        const response = await axios.get(
            `${API_BASE_URL}/members/check-name`,
            {
                params: { name: userName },
                headers: { Authorization: `Bearer ${access_token}` },
            }
        );

        return response.data;
    } catch (error) {
        if (error.response) {
            // 서버가 응답을 반환한 경우 (400, 401, 409, 500 등)
            const { status, data } = error.response;
            if (status === 400) {
                // 잘못된 요청
                throw new Error(data.message || "잘못된 요청입니다.");
            } else if (status === 401) {
                // 인증되지 않은 사용자
                throw new Error(data.message || "인증되지 않은 사용자입니다.");
            } else if (status === 409) {
                // 닉네임 중복
                throw new Error(data.message || "중복되는 닉네임입니다.");
            } else if (status === 500) {
                // 서버 내부 에러
                throw new Error(data.message || "서버 내부 에러입니다.");
            } else {
                // 기타 에러
                throw new Error(data.message || "알 수 없는 에러가 발생했습니다.");
            }
        } else if (error.request) {
            // 요청은 보냈으나 응답이 없음
            throw new Error("서버로부터 응답이 없습니다.");
        } else {
            // 요청을 보내기 전 오류
            throw new Error(error.message);
        }
    }
}

export async function registerProfile(profileData, access_token) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/members`,
            profileData,
            {
                headers: { Authorization: `Bearer ${access_token}` },
            }
        );
        return response.data;
    } catch (error) {
        
    }
}