import api from "./api";

// 모든 장소의 스탬프 상태 목록 반환
export const getStampStatus = async () => {
  try {
    const res = await api.get('/stamps/status');
    // [{id, name, badge:boolean}]
    return res.data;
  } catch (error) {
    // 네트워크, 서버 오류 모두 여기서 처리
    throw error;
  }
};
