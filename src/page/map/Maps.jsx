import React, { useEffect,useState } from 'react';
import { Map, Marker } from 'react-kakao-maps';
import axios from 'axios';
import styled from 'styled-components';

const Button = styled.button`
  width: 100px;
  height: 100px;
  border: 3px solid red;
  cursor: pointer;
`;

const KakaoMaps = () => {

  // geolocation을 이용한 현재 위도/경도 값 구하기!!
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [address, setAddress] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const [currCategory, setCurrCategory] = useState('');
  const [markers, setMarkers] = useState([]);
  const [placeOverlay, setPlaceOverlay] = useState(null);
  const [contentNode, setContentNode] = useState(null);
  const [map, setMap] = useState(null);

  const onSuccess = (position) => {
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  };

  const onError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
  }, []);

  const getGeocodeKakao = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK fb799e952b2f756180b70a86706e89c2`,
          },
        }
      );
      setAddress(response.data.documents[0].address.address_name);
    } catch (error) {
      console.error("Kakao Geocoding error:", error);
    }
  };
  getGeocodeKakao(location.lat, location.long);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

useEffect(() => {
    console.log(location.lat, location.long);
    getGeocodeKakao(location.lat, location.long);
  }, [location]);

  useEffect(() => {
    const initializeMap = async () => {
      if (map) {
        map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.OVERLAY);
  
        const newMap = new window.kakao.maps.Map(document.getElementById('kakao-map'), {
          center: new window.kakao.maps.LatLng(location.lat, location.long),
          level: 3,
        });
  
        setMap(newMap);
  
        const overlay = new window.kakao.maps.CustomOverlay({ zIndex: 1 });
        setPlaceOverlay(overlay);
  
        const node = document.createElement('div');
        setContentNode(node);
        node.className = 'placeinfo_wrap';
  
        addEventHandle(node, 'mousedown', window.kakao.maps.event.preventMap);
        addEventHandle(node, 'touchstart', window.kakao.maps.event.preventMap);
  
        overlay.setContent(node);
        newMap.addOverlayMapTypeId(window.kakao.maps.MapTypeId.OVERLAY);
  
        window.kakao.maps.event.addListener(newMap, 'idle', searchPlaces);
      }
    };
  
    initializeMap();
  
    return () => {
      if (map) {
        map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.OVERLAY);
      }
    };
  }, [location, map]);
  // useEffect(() => {
  //   const initializeMap = async () => {
  //     const newMap = new window.kakao.maps.Map(document.getElementById('kakao-map'), {
  //       center: new window.kakao.maps.LatLng(location.lat, location.long),
  //       level: 3,
  //     });

  //     setMap(newMap);

  //     const overlay = new window.kakao.maps.CustomOverlay({ zIndex: 1 });
  //     setPlaceOverlay(overlay);

  //     const node = document.createElement('div');
  //     setContentNode(node);
  //     node.className = 'placeinfo_wrap';

  //     addEventHandle(node, 'mousedown', window.kakao.maps.event.preventMap);
  //     addEventHandle(node, 'touchstart', window.kakao.maps.event.preventMap);

  //     overlay.setContent(node);
  //     newMap.addOverlayMapTypeId(window.kakao.maps.MapTypeId.OVERLAY);

  //     window.kakao.maps.event.addListener(newMap, 'idle', searchPlaces);
  //   };

  //   initializeMap();

  //   return () => {
  //     map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.OVERLAY);
  //   };
  // }, [location]);

  useEffect(() => {
    addCategoryClickEvent();
  }, [contentNode]);

  const addEventHandle = (target, type, callback) => {
    target.addEventListener(type, callback);
  };

  const addCategoryClickEvent = () => {
    const category = document.getElementById('category');
    const children = category.children;

    for (let i = 0; i < children.length; i++) {
      children[i].addEventListener('click', onClickCategory);
    }
  };

  const onClickCategory = (event) => {
    const { id } = event.target;
    const className = event.target.className;

    placeOverlay.setMap(null);

    if (className === 'on') {
      setCurrCategory('');
      changeCategoryClass();
      // removeMarker();
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
    if (!currCategory) {
      return;

    }

    placeOverlay.setMap(null);
    removeMarker();

    const ps = new window.kakao.maps.services.Places(map);

    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
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

  const displayPlaceInfo = (place) => {
    const content = `
      <div class="placeinfo">
        <a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}">${place.place_name}</a>
        ${place.road_address_name ? `
          <span title="${place.road_address_name}">${place.road_address_name}</span>
          <span class="jibun" title="${place.address_name}">(지번 : ${place.address_name})</span>` :
        `<span title="${place.address_name}">${place.address_name}</span>`}
        <span class="tel">${place.phone}</span>
      </div>
      <div class="after"></div>
    `;

    contentNode.innerHTML = content;
    placeOverlay.setPosition(new window.kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);
  };





  useEffect(() => {
    // Kakao 지도 API 스크립트 로드!
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1d0ba2bba93f2c27d7d493f6ea9b1a74&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      // Kakao 맵 초기화
      window.kakao.maps.load(() => {
        console.log('Kakao Maps API script loaded');
        const container = document.getElementById('kakao-map');  // 지도를 담을 영역의 DOM 레퍼런스 
        const options = { // 지도를 생성할 때 필요한 기본 옵션 
          center: new window.kakao.maps.LatLng(location.lat, location.long), // 초기 중심 좌표 (위도, 경도)
          level: 3, // 초기 확대 수준
        };
        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴 

        // 마커가 표시될 위치 
        const markerPosition = new window.kakao.maps.LatLng(location.lat, location.long);
        // 마커 생성 
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        // 마커가 지도 위에 표시되도록 설정 
        marker.setMap(map);

        // 인포윈도우에 표시될 내용으로 HTML 문자열을 사용 
        const iwContent = '<div style="padding:5px; font-size: 14px;">Hello!😀<br><a href="https://map.kakao.com/link/map/시청역,37.5665, 126.9780" style="color:black; text-decoration: none" target="_blank">지도보기</a> <a href="https://map.kakao.com/link/to/37.5665, 126.9780" style="color:black; text-decoration: none" target="_blank">길찾기</a></div>';
        const iwPosition = new window.kakao.maps.LatLng(location.lat, location.long);  // 인포윈도우 표시될 위치를 설정
        // 설정한 위치와 내용으로 인포윈도우 객체를 생성 
        const infowindow = new window.kakao.maps.InfoWindow({
          position: iwPosition,
          content:iwContent
        });
        infowindow.open(map, marker);

        // 지도 확대 축소 컨트롤 추가
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 지도 타입 컨트롤 추가
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        
      });
    };

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div>
       <Button>
        카페
       </Button>
       <Button>
        음식점
       </Button>
       <Button>
        병원
       </Button>
       </div>
      <div id='category'></div>
      <div id="kakao-map" style={{ width: '50%', height: '500px', margin: '0 auto' }}>      </div>
     
    </div>
  );
};

export default KakaoMaps;