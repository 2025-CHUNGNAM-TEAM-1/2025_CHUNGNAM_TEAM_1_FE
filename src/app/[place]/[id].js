import React from 'react';
import { Text } from 'react-native';
import PlaceDetailScreen from '../../components/PlaceDetail/PlaceDetailScreen';
import { usePlaceDetail } from '../../hooks/usePlaceDetail';
import { useTimeEstimates } from '../../hooks/useTimeEstimates';
import LoadingSpinner from '../../components/LoadingSpinner';

const PlaceDetailPage = ({ route }) => {
  const { placeId, userLocation } = route.params;  // 네비게이션에서 받는 params
  const { detail, loading: detailLoading, error: detailError } = usePlaceDetail(placeId);

  // 사용자의 현재 위치와 장소 위치가 준비되었을 때 예상시간 호출
  const userPos = userLocation; // 예: { x: 126.9784, y: 37.5665 }
  const destPos = detail ? { x: detail.longitude, y: detail.latitude } : null;

  const { times, loading: timesLoading, error: timesError } = useTimeEstimates(userPos, destPos);

  if (detailLoading) return <LoadingSpinner />;
  if (detailError) return <Text>장소 정보를 불러올 수 없습니다: {detailError}</Text>;
  if (!detail) return <Text>장소 정보가 없습니다.</Text>;

  return (
    <PlaceDetailScreen
      imageUrl={detail.imageUrl}
      placeName={detail.placeName}
      address={detail.description || '주소 정보 없음'}
      openTime={detail.openTime || '운영 시간 정보 없음'}
      phone={detail.phone || '전화번호 정보 없음'}
      walkTime={timesLoading ? '...' : times?.walkTime + '분' || '-'}
      bikeTime={timesLoading ? '...' : times?.bikeTime + '분' || '-'}
      busTime={timesLoading ? '...' : times?.busTime + '분' || '-'}
      onStart={() => {
        // 출발하기 동작 구현 (네비게이션 시작 등)
        alert('출발하기 버튼 클릭됨!');
      }}
    />
  );
};

export default PlaceDetailPage;