import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import { useParams } from "react-router-dom";
import PostAxiosApi from "../../api/PostAxiosApi";

const MapContainer = styled.div`
  width: 80%;
  height: 50vh;
`;

const AppContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex; /* 수평 정렬을 위해 flex 사용 */
  align-items: center; /* 수직 중앙 정렬 */
`;

const InputWrapper = styled.div`
  flex: 1; /* 입력창이 확장되도록 함 */
  display: flex; /* 내부 요소를 수평으로 배치하기 위해 flex 사용 */
  align-items: center; /* 수직 중앙 정렬 */
`;

const InfoWindowContainer = styled.div`
  position: fixed;
  top: 140px;
  right: 20px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 260px;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%; /* 입력창이 전체 너비를 차지하도록 함 */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
`;

const InfoWindowContent = styled.div`
  padding: 10px;
  font-size: 16px;
`;

const KakaoMap = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 }); // 위도, 경도
  const mapRef = useRef(null); // 지도를 담을 영역의 DOM 레퍼런스
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState(null); // 지도 객체
  const [markers, setMarkers] = useState([]); // 마커 배열
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소

  const [sportsData, setSportsData] = useState("");
  const { postId } = useParams();

  // 현재 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  // 현재 위치 가져오기
  const onSuccess = (position) => {
    console.log(
      "현재 위치 : " + position.coords.latitude,
      position.coords.longitude
    );
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  };

  const onError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    const container = mapRef.current; // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(location.lat, location.long),
      level: 4,
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, [location]);

  const handleSearchInputChange = (event) => {
    console.log("검색내용 : ", searchQuery);
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    console.log("검색 : ", searchQuery);
    const resp = await AdminAxiosApi.mapSearch(searchQuery);
    setSportsData(resp.data);
    console.log(resp);
  };

  const handleAppointLoad = async () => {
    try {
      console.log("주소 postId: ", postId);
      // 디비에서 주소 목록을 가져오는 비동기 함수 호출
      const rsp = await PostAxiosApi.postAddressById(postId);
      console.log(rsp.data);
      console.log("주소주라구!! " + postId);
      if (rsp.status === 200) {
        const { place } = rsp.data; // 주소 정보에서 place 추출
        console.log("place: ", place);

        // 여기까지는 실행됨.

        // 주소를 지도에 표기
        if (place) {
          // 주소-좌표 변환 객체 생성
          const geocoder = new window.kakao.maps.services.Geocoder();

          // 주소로 좌표를 검색
          geocoder.addressSearch(place, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              console.log("주소 변환: " + coords); // 주소 변환도 ok!!

              // 결과값으로 받은 위치를 마커로 표시
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });
              console.log("Marker:", marker);
              console.log("map, coords 나와랏! ", map, coords);
              // 인포윈도우로 장소에 대한 설명을 표시
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${place}</div>`,
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동
              if (map) {
                // map이 null이 아닌 경우에만 호출
                map.setCenter(coords);
                console.log(map); // 안에 객체 제대로 확인 ok!!
              }
            } else {
              console.error("주소를 찾을 수 없습니다:", place);
            }
          });
        } else {
          console.error("주소 정보가 없습니다.");
        }
      }
    } catch (error) {
      console.error("주소 목록을 가져오는 중에 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    if (map) {
      handleAppointLoad(map);
    }
  }, [map]);

  // useEffect(() => {
  //   if (!sportsData) return;
  //   markers.forEach((marker) => marker.setMap(null));

  //   const newMarkers = sportsData.map((place) => {
  //     const placeMarker = new window.kakao.maps.Marker({
  //       position: new window.kakao.maps.LatLng(place.latitude, place.longitude), // 마커 위치
  //     });
  //     placeMarker.setMap(map); // 지도에 마커 표시
  //     window.kakao.maps.event.addListener(placeMarker, "click", () => {
  //       setSelectedPlace(place);
  //     });
  //     return placeMarker;
  //   });
  //   setMarkers(newMarkers);
  // }, [sportsData]);

  return (
    <AppContainer>
      <MapContainer ref={mapRef}></MapContainer>
      <SearchContainer>
        <InputWrapper>
          <Input
            type="text"
            placeholder="검색할 장소를 입력하세요!"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearchButtonClick();
              }
            }}
          />
        </InputWrapper>
        <Button onClick={handleSearchButtonClick}>확인</Button>
      </SearchContainer>
      {selectedPlace && (
        <InfoWindowContainer>
          <InfoWindowContent>
            <strong>{selectedPlace.name}</strong>
            <br />
            주소: {selectedPlace.address}
            <br />
            전화번호: {selectedPlace.phone}
          </InfoWindowContent>
        </InfoWindowContainer>
      )}
    </AppContainer>
  );
};

export default KakaoMap;
