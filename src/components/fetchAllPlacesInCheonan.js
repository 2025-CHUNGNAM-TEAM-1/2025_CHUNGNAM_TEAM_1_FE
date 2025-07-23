import fetchPlacesByCategory from "../utils/fetchKakaoPlaces";
import CHEONAN_CENTER_POINTS from "../constant/cheonan";

// categoryCodes 예: CT1(문화시설), AT4(관광명소) 같이 복수 지정도 가능
const fetchAllPlacesInCheonan = async (categoryCodes = ['CT1']) => {

  const allPlaces = [];

  for (const categoryCode of categoryCodes) {
    for (const point of CHEONAN_CENTER_POINTS) {
      // 최대 3페이지 호출 예시 (필요하면 45까지 늘릴 수 있음)
      for (let page = 1; page <= 1; page++) {
        const places = await fetchPlacesByCategory(
          point.latitude,
          point.longitude,
          categoryCode,
          page
        );
        // 중복 제거(장소 id 기준)하여 배열에 삽입
        places.forEach(place => {
          if (!allPlaces.find(p => p.id === place.id)) {
            allPlaces.push(place);
          }
        });

        // 받은 데이터가 적으면 마지막 페이지라 보고 중단
        if (places.length < 15) break;
      }
    }
  }
  return allPlaces;
};

export default fetchAllPlacesInCheonan;