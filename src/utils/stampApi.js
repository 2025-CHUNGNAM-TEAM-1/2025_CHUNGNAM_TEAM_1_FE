import api from "./api";

export const getStampStatus = async () => {
  try {
    const res = await api.get('/stamps/status');
    console.log(res.data)
    // [{id, name, badge:boolean}]
    return res.data;
  } catch (error) {
    // 네트워크, 서버 오류 모두 여기서 처리
    throw error;
  }
};

export const getStampStatusByPlaceId = async (placeId) => {
  try {
    const res = await api.get(`/stamps/status/${placeId}`);
    // 예: { placeId: 1001, collected: true }
    console.log(res.data)
    return res.data;
  } catch (error) {
    // 네트워크, 서버 오류 모두 여기서 처리
    throw error;
  }
};