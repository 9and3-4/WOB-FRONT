import { useState, useEffect } from "react";
import styled from "styled-components";
import SelectSports from "../component/interest/SelectSports";
import SelectArea from "../component/interest/SelectArea";
import { WhiteBoard } from "../component/interest/WhiteBoard";

const Container = styled.div`
  width: 768px;
  height: 100vh;
  margin: 0px auto;
  background-color: #04bf8a;
`;

const InterestEnter = () => {
  const [showWhiteBoard, setShowWhiteBoard] = useState(false);
  const activityList = [
    "헬스",
    "골프",
    "자전거",
    "등산",
    "축구",
    "농구",
    "야구",
    "탁구",
    "테니스",
    "배드민턴",
    "런닝",
    "볼링",
  ];
  const activityAreaList = [
    "강남구",
    "강북구",
    "강동구",
    "강서구",
    "양천구",
    "구로구",
    "영등포구",
    "금천구",
    "동작구",
    "관악구",
    "서초구",
    "송파구",
    "마포구",
    "서대문구",
    "은평구",
    "종로구",
    "중구",
    "성동구",
    "용산구",
    "광진구",
    "중랑구",
    "동대문구",
    "성북구",
    "도봉구",
    "노원구",
  ];

  const minValue = 1;
  const maxValue = 3;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWhiteBoard(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Container>
        <WhiteBoard show={showWhiteBoard}>
          <SelectSports
            options={activityList}
            min={minValue}
            max={maxValue}
            title={"관심운동 등록"}
            text={`최소 ${minValue}개 최대 ${maxValue}개 선택해주세요.`}
          />
          {/* <SelectArea
            options={activityAreaList}
            min={minValue}
            max={maxValue}
            title={"관심지역 등록"}
            text={`최소 ${minValue}개 최대 ${maxValue}개 선택해주세요.`}
          /> */}
        </WhiteBoard>
      </Container>
    </>
  );
};

export default InterestEnter;
