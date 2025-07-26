import api from "./api";

export async function getAllPlaces() {
    try {
        const response = await api.get('/api/tours/map');
        
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            throw new Error('세션이 만료되어 다시 로그인해주세요.');
        }
        console.log("에러")
        throw error;
    }
}

export async function searchPlaces(keyword) {
    try {
        console.log(keyword)
        const response = await api.get('/api/tours/search', {
            params: { keyword }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response?.status === 401) {
                throw new Error('세션이 만료되어 다시 로그인해주세요.');
            } else {
                throw new Error("장소 정보를 불러올 수 없습니다.");
            }
        } else {
            throw new Error(error.message);
        }
    }
}