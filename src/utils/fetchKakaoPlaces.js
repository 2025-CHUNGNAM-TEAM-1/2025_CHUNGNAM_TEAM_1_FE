import { KAKAO_REST_API_KEY } from "@env";

const fetchPlacesByCategory = async (latitude, longitude, categoryCode, page = 1) => {
    const url = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${categoryCode}&y=${latitude}&x=${longitude}&radius=20000&page=${page}&size=15`;
    const res = await fetch(url, {
        headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` }
    });
    const data = await res.json();
    if (!data.documents) return [];
    return data.documents.map(doc => ({
        id: doc.id,
        name: doc.place_name,
        latitude: parseFloat(doc.y),
        longitude: parseFloat(doc.x),
        address: doc.address_name,
        category: categoryCode,
    }));
};

export default fetchPlacesByCategory