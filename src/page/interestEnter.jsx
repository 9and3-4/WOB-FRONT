import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import SelectSports from "../component/interest/SelectSports";
import SelectArea from "../component/interest/SelectArea";
import { WhiteBoard } from "../component/interest/WhiteBoard";

const Container = styled.div`
  width: 768px;
  height: 100vh;
  margin: 0px auto;
  background-color: #04bf8a;
`;

const slideOutLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const slideInRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const AnimationContainer = styled.div`
  animation: ${({ sportsCompleted }) =>
      sportsCompleted ? slideOutLeft : slideInRight}
    0.5s ease;
`;

const InterestEnter = () => {
  const [showWhiteBoard, setShowWhiteBoard] = useState(false);
  const [sportsCompleted, setSportsCompleted] = useState(false);
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

  const handleSportsCompletion = () => {
    setSportsCompleted(true);
  };

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
          <AnimationContainer sportsCompleted={sportsCompleted}>
            {sportsCompleted ? (
              <SelectArea
                options={activityAreaList}
                min={minValue}
                max={maxValue}
                title={"관심지역 등록"}
                text={`최소 ${minValue}개 최대 ${maxValue}개 선택해주세요.`}
              />
            ) : (
              <SelectSports
                onComplete={handleSportsCompletion}
                options={activityList}
                min={minValue}
                max={maxValue}
                title={"관심운동 등록"}
                text={`최소 ${minValue}개 최대 ${maxValue}개 선택해주세요.`}
              />
            )}
          </AnimationContainer>
        </WhiteBoard>
      </Container>
    </>
  );
};

export default InterestEnter;
