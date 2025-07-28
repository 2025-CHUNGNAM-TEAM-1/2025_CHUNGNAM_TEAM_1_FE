import React, { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { KAKAO_MAP_JS_KEY } from "@env";
import { getTransitRoute, getWalkRoute } from "../../utils/startEcoMove";
import { userLocationStore } from "../../stores/useLocationStore";
import { usePlaceStore } from "../../stores/usePlaceStore";
import { useTransportStore } from "../../stores/useTransportStore";

function KakaoMapWebView() {
  const location = userLocationStore(state => state.location);
  const selectedPlace = usePlaceStore(state => state.selectedPlace);
  const mode = useTransportStore(state => state.mode);
  const webviewRef = useRef(null);

  // 1. Polyline(경로)와 출발/도착점 마커 전달
  useEffect(() => {
    if (location && selectedPlace && webviewRef.current && mode) {
      async function fetchRouteAndSend() {
        let routeCoords = [];
        if (mode === "WALK" || mode === "BICYCLE") {
          routeCoords = await getWalkRoute(
            location.longitude,
            location.latitude,
            selectedPlace.place.longitude,
            selectedPlace.place.latitude
          );
        } else if (mode === "TRANSIT") {
          routeCoords = await getTransitRoute(
            location.longitude,
            location.latitude,
            selectedPlace.place.longitude,
            selectedPlace.place.latitude
          );
        }

        if (routeCoords && Array.isArray(routeCoords)) {
          const formattedCoords = routeCoords.map(c => ({
            latitude: c.latitude ?? c.lat,
            longitude: c.longitude ?? c.lng,
          }));

          const message = {
            type: "route",
            route: formattedCoords,
            start: {
              latitude: location.latitude,
              longitude: location.longitude
            },
            end: {
              latitude: selectedPlace.place.latitude,
              longitude: selectedPlace.place.longitude
            }
          };
          webviewRef.current.postMessage(JSON.stringify(message));
        }
      }
      fetchRouteAndSend();
    }
  }, [location, selectedPlace, mode]);

  // 2. 사용자 실시간 위치 전달 (위치가 변경될 때마다)
  useEffect(() => {
    if (location && webviewRef.current) {
      const message = {
        type: "userMove",
        user: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      };
      webviewRef.current.postMessage(JSON.stringify(message));
    }
  }, [location]);

  // 3. HTML + JS: 경로/마커/위치마커 렌더링
  const kakaoMapHtml = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JS_KEY}"></script>
    </head>
    <body style="margin:0;padding:0;">
      <div id="map" style="width:100vw; height:100vh;"></div>
      <script>
        var map, polyline, startMarker, endMarker, userMarker;

        function drawPolyline(coords) {
          if (!map) return;
          var path = coords.map(function(coord){
            return new kakao.maps.LatLng(coord.latitude, coord.longitude);
          });
          if(polyline) polyline.setMap(null);
          polyline = new kakao.maps.Polyline({
            path: path,
            strokeWeight: 5,
            strokeColor: '#2196F3',
            strokeOpacity: 0.8,
            strokeStyle: 'solid'
          });
          polyline.setMap(map);
        }

        function setStartMarker(coord) {
          if(startMarker) startMarker.setMap(null);
          startMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(coord.latitude, coord.longitude),
            map: map,
            title: "출발지",
            image: new kakao.maps.MarkerImage(
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              new kakao.maps.Size(24, 35)
            )
          });
        }
        function setEndMarker(coord) {
          if(endMarker) endMarker.setMap(null);
          endMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(coord.latitude, coord.longitude),
            map: map,
            title: "도착지"
          });
        }
        function setUserMarker(coord) {
          if (!map || !coord) return;
          if(userMarker) userMarker.setMap(null);
          userMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(coord.latitude, coord.longitude),
            map: map,
            title: "사용자 위치",
            image: new kakao.maps.MarkerImage(
              "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              new kakao.maps.Size(32,32)
            )
          });
          map.setCenter(new kakao.maps.LatLng(coord.latitude, coord.longitude));
        }

        function receiveMessage(event) {
          var data = JSON.parse(event.data || "{}");
          if (data.type === "route" && Array.isArray(data.route)) {
            drawPolyline(data.route);
            if(data.start) setStartMarker(data.start);
            if(data.end) setEndMarker(data.end);
            setUserMarker(data.start);
          }
          if (data.type === "userMove" && data.user) {
            setUserMarker(data.user);
          }
        }

        document.addEventListener('message', receiveMessage); // Android
        window.addEventListener('message', receiveMessage);   // iOS

        window.onload = function() {
          map = new kakao.maps.Map(document.getElementById('map'), {
            center: new kakao.maps.LatLng(37.5665, 126.9780),
            level: 6
          });
        };
      </script>
    </body>
  </html>
  `;

  return (
    <WebView
      ref={webviewRef}
      originWhitelist={['*']}
      source={{ html: kakaoMapHtml }}
      style={{ flex: 1 }}
      onError={e => console.error('WebView error:', e)}
      onMessage={e => console.log('WebView message:', e.nativeEvent.data)}
    />
  );
}

export default KakaoMapWebView;
