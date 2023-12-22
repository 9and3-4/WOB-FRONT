// 지도(내 현재위치 + 카테고리별 목록)
import React, { useEffect, useState, useRef } from 'react';
import { Map, Marker } from 'react-kakao-maps';
import axios from 'axios';
import styled from 'styled-components';
import MapComponent from '../../component/MapComponent';


const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 70px;
  height: 30px;
  margin: 5px;
  background-color: #DFEDE9;
  border-radius: 5px;
  color: #353535;
  cursor: pointer;
  
  &:hover{
    background-color: #04BF8A;
  }
`;

const KakaoMaps = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [address, setAddress] = useState("");
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const [currentPosition, setCurrentPosition] = useState({
    // 초기 기본 위도,경도 값
    lat: 37.566826,
    long: 126.9786567,
  });
  const data = [
    {
      location : "test1",
      address : "test2",
      category : "test3",
      
      location : "test1",
      address : "test2",
      category : "test3",

      location : "test1",
      address : "test2",
      category : "test3",
    }  
  ]

  // 스크립트 엘리먼트를 추적하기 위한 ref
  const scriptRef = useRef(null); 

  // 경도, 위도 위치 성공했을 시
  const onSuccess = (position) => {
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  };
  // 위치를 찾지 못했을 때
  const onError = (error) => {
    console.error(error);
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 현재 위치의 geolocation 가져오기
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  const getGeocodeKakao = async (lat, lng) => {
    try {
      // 카카오 API를 사용하여 좌표에서 주소 가져오기
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: { // Rest API 값 넣기
            Authorization: `KakaoAK fb799e952b2f756180b70a86706e89c2`,
          },
        }
      );
      setAddress(response.data.documents[0].address.address_name);
    } catch (error) {
      console.error("Kakao Geocoding error:", error);
    }
  };

  useEffect(() => {
    // 위치 변경 시 주소 업데이트
    getGeocodeKakao(location.lat, location.long);
  }, [location]);

  useEffect(() => {
    // 컴포넌트 마운트 시 카카오 맵 API 스크립트 동적으로 로드
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1d0ba2bba93f2c27d7d493f6ea9b1a74&autoload=false`;
    document.head.appendChild(script);
    // 스크립트 엘리먼트를 ref에 할당
    scriptRef.current = script; 

    script.onload = () => {
      // 스크립트 로드 완료 시 카카오 맵 초기화
      window.kakao.maps.load(() => {
        console.log('Kakao Maps API script loaded');
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(location.lat, location.long),
          level: 3,
        };
        const newMap = new window.kakao.maps.Map(container, options);

        setMap(newMap);

        const markerPosition = new window.kakao.maps.LatLng(location.lat, location.long);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(newMap);

        // 내 현재 위치 값 보여줌
        const iwContent = '<div style="padding:5px; margin-left:20px; font-size: 15px;">😀 현재 위치 😀<br><a href="https://map.kakao.com/link/map/시청역,37.5665, 126.9780" style="color:black; color:blue; text-decoration: line" target="_blank">지도상세</a> <a href="https://map.kakao.com/link/to/37.5665, 126.9780" style="color:black; color:blue; text-decoration: line" target="_blank">길찾기</a></div>';
        const iwPosition = new window.kakao.maps.LatLng(location.lat, location.long);
        const infowindow = new window.kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent,
        });
        infowindow.open(newMap, marker);
        
        // 지도 줄이고 늘리는 것 
        const zoomControl = new window.kakao.maps.ZoomControl();
        newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        newMap.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
      });
    };

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      if (scriptRef.current && scriptRef.current.parentNode) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, [location]);

  const onClickCategory = (event) => {
    const { id, className } = event.target;

    // 기존의 오버레이 및 마커 제거
    removePlaceOverlay();

    if (className === 'on') {
      // 이미 선택된 카테고리인 경우 해제
      setCurrCategory('');
      changeCategoryClass();
      removeMarker();
    } else {
      // 선택된 카테고리 설정 및 UI 업데이트
      setCurrCategory(id);
      changeCategoryClass(event.target);
      // 선택된 카테고리에서 장소 검색
      searchPlaces();
    }
  };

  const changeCategoryClass = (el) => {
    // 선택된 카테고리 버튼의 스타일 변경
    const category = document.getElementById('category');
    const children = category.children;

    for (let i = 0; i < children.length; i++) {
      children[i].className = '';
    }

    if (el) {
      el.className = 'on';
    }
  };

  const searchPlaces = () => {
    if (!currCategory || !map) {
      return;
    }
    // 기존의 오버레이 및 마커 제거
    removePlaceOverlay();
    removeMarker();

    // 선택된 카테고리에서 장소 검색
    const ps = new window.kakao.maps.services.Places(map);
    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // 맵에 장소 표시
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      console.log('검색 결과가 없습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      console.error('검색 중 오류가 발생했습니다.');
    }
  };

  const displayPlaces = (places) => {
    places.forEach((place) => {
      // 각 장소에 대한 마커 추가
      const marker = addMarker(new window.kakao.maps.LatLng(place.y, place.x));
      // 클릭 이벤트 추가하여 장소 정보 표시
      window.kakao.maps.event.addListener(marker, 'click', () => displayPlaceInfo(place));
    });
  };

  const addMarker = (position) => {
    const { kakao } = window;
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png';
    const imageSize = new kakao.maps.Size(27, 28);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(72, 208),
      spriteOrigin: new kakao.maps.Point(46, 0),
      offset: new kakao.maps.Point(11, 28),
    };
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    const marker = new kakao.maps.Marker({
      position,
      image: markerImage,
    });

    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    return marker;
  };

  const removeMarker = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const removePlaceOverlay = () => {
    if (map && map.removeOverlayMapTypeId) {
      map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.OVERLAY);
    }
  };


  const displayPlaceInfo = (place) => {
    console.log('장소 정보 표시:', place);
    const detailInfo = `<div style="line-height: 23px;"><p style="display:flex; flex-direction:row; align-items: center; border-radius:5px;">장소명: ${place.place_name}</p>\n<p>주소: ${place.address_name}</p>\n<p>카테고리: ${place.category_name}</p></div>`;

    // 예시: 간단하게 alert으로 표시
    // alert(detailInfo);

    // 커스텀 오버레이를 생성하고 내용을 설정합니다.
  const content = `<div style="padding:10px; background-color:white; border-radius:5px;"><div>${detailInfo}<div/> <button style="display:flex; margin-top: 10px; cursor: pointer; background-color: #04BF8A; color: white; border: none; border-radius: 3px; padding: 5px 10px;" onclick="closeOverlay()">닫기</button></div>`;
  const position = new window.kakao.maps.LatLng(place.y, place.x); 

    // 기존의 오버레이 제거
    removePlaceOverlay();

    // 커스텀 오버레이 생성 및 지도에 추가
    const customOverlay = new window.kakao.maps.CustomOverlay({
      content,
      position,
      xAnchor: 0.5,
      yAnchor: 1.0,
    });
    customOverlay.setMap(map);

    // 오버레이를 지도에 추가한 후 지도 중심을 해당 위치로 이동시킵니다.
    map.panTo(position);
     // 닫기 버튼 클릭 시 오버레이를 닫습니다.
  window.closeOverlay = () => {
    customOverlay.setMap(null);
  };
    };
 
  return (
    <Container>
      <div>
        <Button onClick={() => onClickCategory({ target: { id: 'CE7', className: ''} })}>
          카페
        </Button>
        <Button onClick={() => onClickCategory({ target: { id: 'FD6', className: ''} })}>
          음식점
        </Button>
        <Button onClick={() => onClickCategory({ target: { id: 'HP8', className: ''} })}>
          병원
        </Button>
        <Button onClick={() => onClickCategory({ target: { id: 'PK6', className: ''} })}>
          주차장
        </Button>
        <Button onClick={() => onClickCategory({ target: { id: 'SW8', className: ''} })}>
          지하철역
        </Button>
        <Button onClick={() => onClickCategory({ target: { id: 'CT1', className: ''} })}>
          문화시설
        </Button>
      </div>
      <MapComponent />
      <div id="category"></div>
      <div id="map" style={{ width: '100%', height: '500px', margin: '0 auto' }}></div>
    </Container>
  );
};

export default KakaoMaps;
