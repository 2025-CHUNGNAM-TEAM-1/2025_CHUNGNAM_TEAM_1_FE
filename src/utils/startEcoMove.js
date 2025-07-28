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
            } else {
                throw new Error("알 수 없는 에러가 발생했습니다.");
            }
        } else if (error.request) {
            throw new Error(error.message);
        } else {
            throw new Error(error.message);
        }
    }
}

export async function getTransitRoute(startX, startY, endX, endY) {
    try {
        const response = await api.get(
            `/eco-moves/google_maps`,
            {
                params: { startX, startY, endX, endY },
            }
        );
        return response.data;
    } catch (error) {
        console.error('대중교통 경로 조회 실패:', error);
        return null;
    }
}

export async function getWalkRoute(startX, startY, endX, endY) {
    try {
        console.log(startX, startY, endX, endY);
        const response = await api.get(
            `/eco-moves/tmap`,
            {
                params: { startX, startY, endX, endY },
            }
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('도보 경로 조회 실패:', error);
        return null;
    }
}