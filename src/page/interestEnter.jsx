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
            options={activityList}
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
