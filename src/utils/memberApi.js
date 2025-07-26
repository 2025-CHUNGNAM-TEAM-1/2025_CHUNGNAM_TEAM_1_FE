import api from "./api"

export async function checkUserNameDuplicate(userName) {
    try {
        const response = await api.get(
            '/members/check-name',
            {
                params: { name: userName }
            }
        );

        return response.data;
    } catch (error) {
        if (error.response) {
            console.log("서버와 연결 에러 뜸")
            // 서버가 응답을 반환한 경우 (400, 401, 409, 500 등)
            const { status } = error.response;
            console.log(status)
            if (status === 400) {
                // 잘못된 요청
                throw new Error("잘못된 요청입니다.");
            } else if (status === 401) {
                // 인증되지 않은 사용자
                throw new Error('세션이 만료되어 다시 로그인해주세요.');
            } else if (status === 409) {
                // 닉네임 중복
                throw new Error("중복되는 닉네임입니다.");
            } else if (status === 500) {
                // 서버 내부 에러
                throw new Error("서버 내부 에러입니다.");
            } else {
                // 기타 에러
                throw new Error("알 수 없는 에러가 발생했습니다.");
            }
        } else if (error.request) {
            throw new Error(error.message);
        } else {
            throw new Error(error.message);
        }
    }
}

export async function registerProfile(profileData) {
    try {
        const response = await api.post(
            '/members',
            profileData,
        );

        return response.data;
    } catch (error) {
        if (error.response) {
            console.log("서버와 연결 에러 뜸")
            // 서버가 응답을 반환한 경우 (400, 401, 500 등)
            const { status } = error.response;
            console.log(status)
            if (status === 400) {
                // 잘못된 요청
                throw new Error("잘못된 요청입니다.");
            } else if (status === 401) {
                // 인증되지 않은 사용자
                throw new Error('세션이 만료되어 다시 로그인해주세요.');
            } else if (status === 500) {
                // 서버 내부 에러
                throw new Error("서버 내부 에러입니다.");
            } else {
                // 기타 에러
                throw new Error("알 수 없는 에러가 발생했습니다.");
            }
        } else if (error.request) {
            throw new Error(error.message);
        } else {
            throw new Error(error.message);
        }
    }
}