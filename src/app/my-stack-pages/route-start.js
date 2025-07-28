import React, { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { KAKAO_MAP_JS_KEY } from "@env";
import { getTransitRoute, getWalkRoute } from "../../utils/startEcoMove";
import { userLocationStore } from "../../stores/useLocationStore";
import { usePlaceStore } from "../../stores/usePlaceStore";

function KakaoMapWebView({ mode = "transit" }) {
    const location = userLocationStore(state => state.location);
    const selectedPlace = usePlaceStore(state => state.selectedPlace);

    const webviewRef = useRef(null);

    useEffect(() => {
        if (location && selectedPlace && webviewRef.current) {
            async function fetchRouteAndSend() {
                let routeCoords = [];
                if (mode === "walk") {
                    routeCoords = await getWalkRoute(
                        location.longitude,
                        location.latitude,
                        selectedPlace.place.longitude,
                        selectedPlace.place.latitude
                    );
                } else if (mode === "transit") {
                    routeCoords = await getTransitRoute(
                        location.longitude,
                        location.latitude,
                        selectedPlace.place.longitude,
                        selectedPlace.place.latitude
                    );
                }

                if (routeCoords && Array.isArray(routeCoords)) {
                    // 좌표 필드명 통일 (latitude, longitude)
                    const formattedCoords = routeCoords.map(c => ({
                        latitude: c.latitude ?? c.lat,
                        longitude: c.longitude ?? c.lng,
                    }));

                    webviewRef.current.postMessage(JSON.stringify(formattedCoords));
                }
            }
            fetchRouteAndSend();
        }
    }, [location, selectedPlace, mode]);

    const kakaoMapHtml = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JS_KEY}"></script>
    </head>
    <body style="margin:0;padding:0;">
      <div id="map" style="width:100vw; height:100vh;"></div>
      <script>
        var map, polyline;

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
          if(path.length > 0) map.setCenter(path[0]);
        }

        function receiveMessage(event) {
          var data = JSON.parse(event.data || "[]");
          drawPolyline(data);
        }

        // Android
        document.addEventListener('message', receiveMessage);
        // iOS
        window.addEventListener('message', receiveMessage);

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
