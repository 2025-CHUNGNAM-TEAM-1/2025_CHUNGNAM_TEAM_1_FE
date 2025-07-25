import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { KAKAO_MAP_JS_KEY } from "@env";

const KakaoMap = ({ latitude, longitude, places = [] }) => {

  const markerScript = `
    var places = ${JSON.stringify(places)};
    places.forEach(function(place) {
      var markerPosition = new kakao.maps.LatLng(place.latitude, place.longitude);
      var customMarkerImage = new kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', new kakao.maps.Size(24, 35));
      var marker = new kakao.maps.Marker({
        map: map,
        position: markerPosition,
        image: customMarkerImage 
      });
      var infowindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px">' + place.name + '</div>'
      });
      kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
      var customOverlay = new kakao.maps.CustomOverlay({
        position: markerPosition,
        content: '<div class="label">' + place.name + '</div>',
        yAnchor: 1.5
      });
      customOverlay.setMap(map);
    });
  `;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JS_KEY}&libraries=services"></script>
      <style>
        html, body, #map { height: 100%; margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        window.onload = function() {
          var mapContainer = document.getElementById('map');
          var mapOption = {
            center: new kakao.maps.LatLng(${latitude}, ${longitude}),
            level: 5
          };
          var map = new kakao.maps.Map(mapContainer, mapOption);

          // 내 위치 마커
          var markerPosition  = new kakao.maps.LatLng(${latitude}, ${longitude});
          var marker = new kakao.maps.Marker({ position: markerPosition, map: map });
          var infowindow = new kakao.maps.InfoWindow({ content: '<div style="padding:3px;color:#111;">내 위치</div>' });
          infowindow.open(map, marker);

          // 문화공간 카테고리 마커 표시
          ${markerScript}
        }
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  webview: {
    flex: 1,
  },
});

export default KakaoMap;