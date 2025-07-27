// seconds가 숫자(초)면 분 또는 "시간+분"으로 변환, 아니면 '-'
export function formatMinutesWithHourLabel(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds)) return '-';
  const minutes = Math.ceil(seconds / 60); // 소수점은 올림 처리
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  if (hours > 0) {
    return `${hours}시간 ${remainingMins}분`;
  }
  return `${minutes}분`;
}