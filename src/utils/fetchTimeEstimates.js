import api from '../utils/api';

export async function fetchTimeEstimates(start, end) {
  // 좌표 유효성 검사
  if (
    typeof start.x !== 'number' ||
    typeof start.y !== 'number' ||
    typeof end.x !== 'number' ||
    typeof end.y !== 'number'
  ) {
    return { times: null, error: '요청 좌표가 유효하지 않습니다.' };
  }

  try {
    const params = {
      startX: start.x,
      startY: start.y,
      endX: end.x,
      endY: end.y,
    };

    // 두 요청 동시 병렬 실행
    const [transitResponse, distanceResponse] = await Promise.all([
      api.get('/eco-moves/estimation/transit', { params }),
      api.get('/eco-moves/estimation/distance', { params }),
    ]);

    return {
      times: {
        walkingTime: distanceResponse.data.walkingTime || '-',
        bikingTime: distanceResponse.data.bikingTime || '-',
        transitWalkingDuration: transitResponse.data.transitWalkingDuration || '-',
        transitDuration: transitResponse.data.transitDuration || '-',
        segmentResponses: transitResponse.data.segmentResponses || [],
      },
      error: null,
    };
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      const serverMessage =
        err.response.data?.message ||
        JSON.stringify(err.response.data) ||
        '서버에서 에러 응답을 받았습니다.';
      return { times: null, error: `[${status}] ${serverMessage}` };
    } else if (err.request) {
      return { times: null, error: '서버가 응답하지 않습니다.' };
    } else {
      return { times: null, error: err.message || '알 수 없는 오류 발생' };
    }
  }
}