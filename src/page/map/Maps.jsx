import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import PostList from "../PostList";

const MapContainer = styled.div`
  width: 70%;
  height: 60vh;
  margin: 0 auto;
`;

const AppContainer = styled.div`
  text-align: center;
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

  useEffect(() => {
    if (!sportsData) return;
    markers.forEach((marker) => marker.setMap(null));

    const newMarkers = sportsData.map((place) => {
      const placeMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude), // 마커 위치
      });
      placeMarker.setMap(map); // 지도에 마커 표시
      window.kakao.maps.event.addListener(placeMarker, "click", () => {
        setSelectedPlace(place);
      });
      return placeMarker;
    });
    setMarkers(newMarkers);
  }, [sportsData]);

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
            <strong>{selectedPlace.title}</strong>
            <br />
            장소: {selectedPlace.place}
            <br />
            일시: {selectedPlace.date},{selectedPlace.time}
            <br />
            모집인원: {selectedPlace.people}
            <br />
            예상비용: {selectedPlace.fee}
            <br />
            일정소개: {selectedPlace.introduction}
          </InfoWindowContent>
        </InfoWindowContainer>
      )}
      <PostList />
    </AppContainer>
  );
};

export default KakaoMap;
