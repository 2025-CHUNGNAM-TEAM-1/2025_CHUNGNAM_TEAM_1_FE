import api from "./api";

export async function startEcoMove({
    placeId,
    expectedWalk,
    expectedBicycle,
    expectedTransit,
    transportType
}) {
    try {
        const body = {
            placeId,
            expectedWalkTime: expectedWalk ?? null,
            expectedBicycleTime: expectedBicycle ?? null,
            expectedTransitTime: expectedTransit ?? null,
            transportType
        };

        const response = await api.post('/eco-moves', body);
        console.log(response.data);
        // 성공
        return response.data;
    } catch (error) {
        if (error.response) {
            const { status } = error.response;
            console.log("서버와 연결 에러 뜸");
            console.log(status);

            if (status === 404) {
                throw new Error("문화 장소 정보를 찾을 수 없습니다.");
            }else {
                throw new Error("알 수 없는 에러가 발생했습니다.");
            }
        } else if (error.request) {
            throw new Error(error.message);
        } else {
            throw new Error(error.message);
        }
    }
}