import { formatMinutesWithHourLabel } from "../hooks/useFormatMinutesWithHourLabel";


export default function formatSegmentResponses(segmentResponses) {
    if (!Array.isArray(segmentResponses) || segmentResponses.length === 0) return '-';

    // 각 구간을 "설명 시간"으로 변환
    const parts = segmentResponses.map(segment => {
        const timeText = formatMinutesWithHourLabel(segment.duration);
        return `${segment.description} ${timeText}`;
    });

    // 구간 구분자: 화살표(→)로 연결, 혹은 " | " 등
    return parts.join(' → ');
}
