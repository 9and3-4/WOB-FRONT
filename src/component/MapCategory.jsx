// mapcategory
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  max-width : 768px;
  min-width : 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 70px;
  height: 30px;
  margin: 5px;
  cursor: pointer;
`;

const KakaoMaps = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.566826,
    long: 126.9786567,
  });
  
  const initializeMapWithUserLocation = () => {
    const container = document.getElementById('map');
    const options = {
      level: 3,
    };
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const center = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
  
        const newMap = new window.kakao.maps.Map(container, {
          center,
          ...options,
        });
  
        setMap(newMap);

        // 현재 위치 마커 추가!
        const marker = addMarker(center, '현재 위치');
        // const marker = addMarker(center);
        // window.kakao.maps.event.addListener(marker,'click',() => displayPlaceInfo({ name : '현재 위치'}));
        // 현재 위치 마커에 더 높은 z-인덱스 설정
        marker.setZIndex(9999);

        // 지도를 현재 위치를 중심으로 이동
        newMap.panTo(center);
      },
      (error) => {
        console.error('Error getting current position:', error);
        // 에러 발생 시 기본 위치로 초기화
        const defaultCenter = new window.kakao.maps.LatLng(37.566826, 126.9786567);
        const newMap = new window.kakao.maps.Map(container, {
          center: defaultCenter,
          ...options,
        });
  
        setMap(newMap);
      }
    );
  };


  useEffect(() => {
    // 지도 초기화
    initializeMapWithUserLocation();

      // 카테고리 클릭 시 처리
      const category = document.getElementById('category');
      const children = category.children;

      for (let i = 0; i < children.length; i++) {
        children[i].addEventListener('click', onClickCategory);
      }

    },[]);



  useEffect(() => {
    // 위치 정보를 받아오는 함수
    const onSuccess = (position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    };

    const onError = (error) => {
      console.log(error);
    };

      // 처음 한 번 받아오고, 그 이후에는 변경될 때마다 갱신
      const watchId = navigator.geolocation.watchPosition(onSuccess, onError);

      return () => {
        // 컴포넌트 언마운트 시 위치 정보 갱신 중지
        navigator.geolocation.clearWatch(watchId);
      };
  }, []);  // 두 번째 인자에 빈 배열을 전달하여 컴포넌트가 마운트될 때만 useEffect가 실행되도록 함

  const onClickCategory = (event) => {
    const { id } = event.target;
    const className = event.target.className;

    // 커스텀 오버레이를 숨김
    removePlaceOverlay();

    if (className === 'on') {
      setCurrCategory('');
      changeCategoryClass();
      removeMarker();
    } else {
      setCurrCategory(id);
      changeCategoryClass(event.target);
      searchPlaces();
    }
  };

  

  const changeCategoryClass = (el) => {
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

    // 커스텀 오버레이를 숨김
    removePlaceOverlay();
    // 지도에 표시되고 있는 마커 제거
    removeMarker();

    const ps = new window.kakao.maps.services.Places(map);
    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면 지도에 마커를 표출
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      // 검색결과가 없는 경우
      console.log('검색 결과가 없습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      // 에러로 인해 검색결과가 나오지 않은 경우
      console.error('검색 중 오류가 발생했습니다.');
    }
  };

  const displayPlaces = (places) => {
    places.forEach((place) => {
      const marker = addMarker(new window.kakao.maps.LatLng(place.y, place.x));
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
    // 커스텀 오버레이 표시 등의 추가 로직을 여기에 작성
    console.log('장소 정보 표시:', place);
  };

  return (
    <Container>
      <div>
        <Button onClick={() => onClickCategory({ target: { id: 'CE7', className: '' } })}>
          카페 
        </Button>
        <Button onClick={() => onClickCategory({ target: { id: 'FD6', className: '' } })}>
          음식점
        </Button>
        <Button onClick={() => onClickCategory({ target: { id: 'HP8', className: '' } })}>
          병원
        </Button>
      </div>
      <div id="category"></div>
      <div id="map" style={{ width: '100%', height: '500px', margin: '0 auto' }}></div>
    </Container>
  );
};

export default KakaoMaps;


