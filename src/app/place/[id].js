import React, { useEffect, useState } from 'react';
import { Text, Alert } from 'react-native';
import PlaceDetailScreen from '../../components/PlaceDetail/PlaceDetailScreen';
import TransportTypeModal from '../../components/TransportTypeModal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { usePlaceStore } from '../../stores/usePlaceStore';
import { userLocationStore } from '../../stores/useLocationStore';
import { fetchTimeEstimates } from '../../utils/fetchTimeEstimates';
import { formatMinutesWithHourLabel } from '../../hooks/useFormatMinutesWithHourLabel';
import { startEcoMove } from '../../utils/startEcoMove';
import { useRouter } from 'expo-router';
import formatSegmentResponses from '../../components/formatSegmentResponses';

const PlaceDetailPage = () => {
  const router = useRouter();
  const userLocation = userLocationStore((state) => state.location);
  const selectedPlace = usePlaceStore((state) => state.selectedPlace);

  const [times, setTimes] = useState(null);
  const [timesLoading, setTimesLoading] = useState(false);
  const [timesError, setTimesError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  async function handleSelectTransport(type) {
    setModalVisible(false);
    try {
      await startEcoMove({
        placeId: selectedPlace.place.id,
        expectedWalk: times?.walkingTime,
        expectedBicycle: times?.bikingTime,
        expectedTransit: times?.transitDuration,
        transportType: type,
      });
      Alert.alert('출발 요청 성공', '친환경 이동이 시작되었습니다!');
      // TODO: 이동 중 화면으로 전환 등 추가 처리
      router.replace('/my-stack-pages/route-start');
    } catch (e) {
      Alert.alert('출발 요청 실패', e.message);
    }
  }

  const segmentText = formatSegmentResponses(times?.segmentResponses);

  return (
    <>
      <PlaceDetailScreen
        placeId={selectedPlace.place.id}
        imageUrl={selectedPlace.place.image}
        placeName={selectedPlace.place.name}
        address={selectedPlace.place.address || '주소 정보 없음'}
        walkTime={timesLoading ? '...' : formatMinutesWithHourLabel(times?.walkingTime)}
        bikeTime={timesLoading ? '...' : formatMinutesWithHourLabel(times?.bikingTime)}
        busTime={timesLoading ? '...' : segmentText}
        onStart={() => setModalVisible(true)}
      />
      <TransportTypeModal
        visible={modalVisible}
        onSelect={handleSelectTransport}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default PlaceDetailPage;