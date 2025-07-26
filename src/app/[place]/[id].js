import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import PlaceDetailScreen from '../../components/PlaceDetail/PlaceDetailScreen';
import LoadingSpinner from '../../components/LoadingSpinner';
import { usePlaceStore } from '../../stores/usePlaceStore';
import { userLocationStore } from '../../stores/useLocationStore';
import { fetchTimeEstimates } from '../../utils/fetchTimeEstimates';

const PlaceDetailPage = () => {
  const userLocation = userLocationStore((state) => state.location);
  const selectedPlace = usePlaceStore((state) => state.selectedPlace);

  const [times, setTimes] = useState(null);
  const [timesLoading, setTimesLoading] = useState(false);
  const [timesError, setTimesError] = useState(null);

  useEffect(() => {
    if (!userLocation || !selectedPlace) {
      setTimes(null);
      return;
    }

    const userPos = { x: userLocation.longitude, y: userLocation.latitude };
    const destPos = { x: selectedPlace.place.longitude, y: selectedPlace.place.latitude };

    async function fetchTimes() {
      setTimesLoading(true);
      setTimesError(null);
      try {
        const { times, error } = await fetchTimeEstimates(userPos, destPos);
        if (error) {
          setTimesError(error);
          setTimes(null);
        } else {
          setTimes(times);
        }
      } catch (err) {
        setTimesError(err.message || '예상 시간 불러오기 중 오류 발생');
        setTimes(null);
      } finally {
        setTimesLoading(false);
      }
    }

    fetchTimes();
  }, []);

  if (!selectedPlace) return <Text>장소 정보가 없습니다.</Text>;

  if (timesError) return <Text>예상 시간을 불러올 수 없습니다: {timesError}</Text>;

  return (
    <PlaceDetailScreen
      imageUrl={selectedPlace.place.image}
      placeName={selectedPlace.place.name}
      address={selectedPlace.place.address || '주소 정보 없음'}
      walkTime={timesLoading ? '...' : times?.walkingTime + '분' || '-'}
      bikeTime={timesLoading ? '...' : times?.bikingTime + '분' || '-'}
      busTime={timesLoading ? '...' : times?.transitDuration + '분' || '-'}
      onStart={() => alert('출발하기 버튼 클릭됨!')}
    />
  );
};

export default PlaceDetailPage;