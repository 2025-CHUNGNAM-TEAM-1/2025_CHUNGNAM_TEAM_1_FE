import { useEffect, useState } from 'react';
import api from '../utils/api';

export function useTimeEstimates(start, end) {
    const [times, setTimes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!start || !end) return;

        async function fetchTimes() {
            setLoading(true);
            setError(null);

            try {
                console.log("예상시간 불러오기")
                console.log(start)
                console.log(end)
                const transitResponse = await api.get('/eco-moves/estimation/transit', {
                    params: {
                        startX: start.x,
                        startY: start.y,
                        endX: end.x,
                        endY: end.y,
                    }
                });

                const distanceResponse = await api.get('/eco-moves/estimation/distance', {
                    params: {
                        startX: start.x,
                        startY: start.y,
                        endX: end.x,
                        endY: end.y,
                    }
                });

                setTimes({
                    walkTime: distanceResponse.data.walkingTime || '-',
                    bikeTime: distanceResponse.data.bikingTime || '-',
                    transitWalkingDuration: transitResponse.data.transitWalkingDuration,
                    transitDuration: transitResponse.data.transitDuration,
                    segmentResponses: transitResponse.data.segmentResponses,
                });

            } catch (err) {
                if (err.response) {
                    setError(`예상 시간 불러오기 실패: ${err.response.status}`);
                } else if (err.request) {
                    setError('서버가 응답하지 않습니다.');
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchTimes();

    }, [start, end]);

    return { times, loading, error };
}