import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WhiteBoard } from "./interest/WhiteBoard";
import SelectSports from "./interest/SelectSportsClon";

const Container = styled.div`
  width: 768px;
  height: 100vh;
  margin: 0px auto;
`;

const PostTopBar = () => {
  const [selectSports, setSelectSports] = useState([]);
  const [selectArea, setSelectArea] = useState([]);

  const sportsList = [
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

  const areaList = [
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
      setSelectSports([]); // 초기에는 선택한 운동이 없는 상태로 설정
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Container>
        <WhiteBoard show={selectSports}>
          <SelectSports
            options={sportsList}
            min={minValue}
            max={maxValue}
            title={"관심 운동"}
          />
        </WhiteBoard>
      </Container>
    </>
  );
};

export default PostTopBar;
