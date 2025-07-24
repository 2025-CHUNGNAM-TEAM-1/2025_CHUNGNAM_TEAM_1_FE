import { useEffect, useState } from 'react';
import api from '../utils/api';

export function usePlaceDetail(placeId) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!placeId) return;

    async function fetchPlaceDetail() {
      setLoading(true);
      setError(null);

      try {
        console.log("장소 불러오기")
        console.log(placeId)
        const response = await api.get(`/culture/places/${placeId}`);
        setDetail(response.data);
      } catch (err) {
        if (err.response) {
          setError(`장소 정보 불러오기 실패: ${err.response.status}`);
        } else if (err.request) {
          setError('서버가 응답하지 않습니다.');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPlaceDetail();

  }, [placeId]);

  return { detail, loading, error };
}