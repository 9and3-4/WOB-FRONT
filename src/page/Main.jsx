import React from "react";
import styled from "styled-components";
import AdCarousel from "../component/MainAd";
import CalendarComp from "../component/CalendarComp";
import Button from "../component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  max-width : 768px;
  min-width : 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const DateBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-top: 15px;
  /* border: 1px gray solid; */
  padding: 0 30px;
`;

const CategoryBox = styled.div`
  height: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;  /* 일정 간격으로 벌어지게 함 */
`;

const MediumContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
`;

const CategoryBox2 = styled.div`
  height: 50px;
  margin-top: 15px;
  display: flex;
  justify-content: space-around;  /* 일정 간격으로 벌어지게 함 */
  width: 75%;  // 미디엄 컨테이너 안에 3/4 차지
`;

const WeatherBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 25%;  // 미디엄 컨테이너 안에 1/4 차지 
  font-size: 17px;
  align-items: center;
  padding-top: 15px;
`;


const CalenderBox = styled.div`
  /* border: 1px gray solid; */
  height: 100px;
`;

const Subtitle = styled.div`
  width: 100%;
  font-size: 17px;
  font-weight: bold;
  margin-top: 30px;
`;

const Main = () => {
   const navigate = useNavigate();

   const handleIconClick = () => {
    navigate("/CalendarComp");
   }
    return(
        <>
         <Container>
            <AdCarousel />
            <CategoryBox>
              <Button label="모든 레져" size="category"/>
              <Button label="🏀 농구" size="category"/>
              <Button label="🏸 배드민턴" size="category"/>
              <Button label="🏓 탁구" size="category"/>
            </CategoryBox>
            <DateBox>
              2023년 12월 
              <FontAwesomeIcon 
              icon={faCalendarDays} 
              style={{ color: 'var(--GREEN)'}} 
              fontSize="25px"
              cursor="pointer"
              onClick={handleIconClick}/>
            </DateBox>
            <CalenderBox>
            <CalendarComp onDateSelect={(date) => console.log(date)} />
            </CalenderBox>
            <MediumContainer>
            <CategoryBox2>
                <Button label="모든 지역" size="category"/>
                <Button label="강남구" size="category"/>
                <Button label="관악구" size="category"/>
                <Button label="서초구" size="category"/>
              </CategoryBox2>
              <WeatherBox>
                   ☀️ 역삼동 15° 
                </WeatherBox>
              </MediumContainer>
              <Subtitle>
                가볍게 운동하자 우리 ☺
              </Subtitle>
         </Container>
        </>
    );
};

export default Main;