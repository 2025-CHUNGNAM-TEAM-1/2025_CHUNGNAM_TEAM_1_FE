import React, { useCallback, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { KAKAO_MAP_JS_KEY } from "@env";
import { useRouter } from "expo-router";
import { usePlaceStore } from "../stores/usePlaceStore";

const KakaoMap = ({ latitude, longitude, places = [] }) => {
  const router = useRouter();
  const { setSelectedPlace } = usePlaceStore();
  const webviewRef = useRef();

  const onMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.type === "requestPlaceDetail" && data.place && data.place.id) {
        setSelectedPlace(data);
        const detail = data.place
        webviewRef.current?.postMessage(JSON.stringify({
          type: "placeDetail",
          id: data.place.id,
          detail,
        }));
      }

      // "자세히 보기" 클릭 시 RN 라우팅
      if (data.type === "moveDetailPage" && data.place && data.place.id) {
        router.push(`/place/${data.place.id}`);
      }
    } catch (e) {
      console.error("onMessage 오류:", e);
    }
  }, [router]
  );


  // const markerScript = `
  //   var places = ${JSON.stringify(places)};

  //   places.forEach(function(place) {
  //     var markerPosition = new kakao.maps.LatLng(place.latitude, place.longitude);
  //     var customMarkerImage = new kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', new kakao.maps.Size(24, 35));
  //     var marker = new kakao.maps.Marker({
  //       map: map,
  //       position: markerPosition,
  //       image: customMarkerImage 
  //     });
  //     var infowindow = new kakao.maps.InfoWindow({
  //       content: '<div style="padding:5px">' + place.name + '</div>'
  //     });
  //     kakao.maps.event.addListener(marker, 'click', function() {
  //       // React Native로 클릭한 장소 데이터 전달
  //       window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'markerClick', place: place }));
  //     });
  //     var customOverlay = new kakao.maps.CustomOverlay({
  //       position: markerPosition,
  //       content: '<div class="label" style="font-weight: bold;">' + place.name + '</div>',
  //       yAnchor: 0,
  //     });
  //     customOverlay.setMap(map);
  //   });
  // `;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JS_KEY}&libraries=clusterer"></script>
      <style>
        html, body, #map { height: 100%; margin: 0; padding: 0; }
        .custom-overlay { position:relative; width:240px; background:#fff; border-radius:8px; box-shadow:0 3px 8px rgba(0,0,0,.23); padding:10px; }
        .overlay-img { width:100%; height:120px; object-fit:cover; border-radius:4px; }
        .overlay-title { font-size:16px; font-weight:bold; margin:8px 0 4px 0;}
        .overlay-address { font-size:13px; color:#444; margin-bottom:4px;}
        .close-btn { position:absolute; top:8px; right:10px; background:transparent; border:none; font-size:18px; color:#888; cursor:pointer;}
        .detail-btn { width:100%; background:#1b78e5; color:#fff; border:none; padding:7px 0; border-radius:5px; margin-top:8px; font-weight:bold; cursor:pointer;}
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        let map, markers = [], overlays = [], openOverlay = null, currentOpenId = null;
        let places = ${JSON.stringify(places)};

        window.onload = function() {
          map = new kakao.maps.Map(document.getElementById('map'), {
            center: new kakao.maps.LatLng(${latitude}, ${longitude}),
            level: 6,
          });

          // 마커/클러스터 세팅
          var clusterer = new kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 7
          });

          var myPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
          var myMarker = new kakao.maps.Marker({ position: myPosition, map: map });
          var myInfo = new kakao.maps.InfoWindow({ content: '<div style="padding:3px;color:#111;">내 위치</div>' });
          myInfo.open(map, myMarker);

          markers = places.map(function(place) {
            var markerPosition = new kakao.maps.LatLng(place.latitude, place.longitude);
            var marker = new kakao.maps.Marker({
              position: markerPosition,
              image: new kakao.maps.MarkerImage(
                'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                new kakao.maps.Size(24, 35)
              ),
            });
            kakao.maps.event.addListener(marker, 'click', function() {
              if (openOverlay) {
                openOverlay.setMap(null);
                openOverlay = null;
                currentOpenId = null;
              }
              // RN에 상세정보 요청
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "requestPlaceDetail",
                place
              }));
              currentOpenId = place.id;
              // 로딩 표시용 오버레이 잠시 띄움
              showCustomOverlay(markerPosition, place, { loading: true });
            });
            return marker;
          });
          clusterer.addMarkers(markers);
        };

        document.addEventListener("message", function(event) {
          try {
            var data = JSON.parse(event.data);
            if (data.type === "placeDetail" && data.detail && data.id === currentOpenId) {
              var detail = data.detail;
              showCustomOverlay(
                new kakao.maps.LatLng(detail.latitude, detail.longitude),
                detail,
                { loading: false }
              );
            }
          } catch (e){
            window.ReactNativeWebView.postMessage(e.toString());
          }
        });

        function showCustomOverlay(position, place, opt={}) {
          if (openOverlay) { openOverlay.setMap(null); openOverlay = null; }

          var content = "<div class='custom-overlay'>";
          if (opt.loading) {
            content += "<div>불러오는 중...</div>";
          } else {
            content += 
              "<button class='close-btn' onclick='window.closeOverlay()'>&times;</button>" +
              "<img class='overlay-img' src='" + (place.image || "") + "' alt='장소 사진' />" +
              "<div class='overlay-title'>" + (place.name || "") + "</div>" +
              "<div class='overlay-address'>" + (place.address || "") + "</div>" +
              "<button class='detail-btn' onclick='window.goDetail(" + JSON.stringify(place.id) + ")'>자세히 보기</button>";
          }
          content += "</div>";

          var overlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content,
            yAnchor: 1,
            xAnchor: 0.5,
            zIndex: 11
          });

          overlay.setMap(map);
          openOverlay = overlay;
        }

        window.closeOverlay = function() {
          if (openOverlay) { openOverlay.setMap(null); openOverlay = null; }
        }

        window.goDetail = function(id) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "moveDetailPage",
            place: { id: id }
          }));
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
        ref={webviewRef}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        onMessage={onMessage}
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