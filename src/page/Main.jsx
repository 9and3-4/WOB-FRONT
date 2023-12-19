import React, { useState } from "react";
import styled from "styled-components";
import AdCarousel from "../component/MainAd";
import CalendarComp from "../component/CalendarComp";
import moment from "moment";
import Button from "../component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Weather from "../hook/useWeather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PostList from "./PostListClon";
// import PostList from "./PostList";
import PostAxiosApi from "../api/PostAxiosApi";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
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
  justify-content: space-around; /* 일정 간격으로 벌어지게 함 */
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
  justify-content: space-around; /* 일정 간격으로 벌어지게 함 */
  width: 75%; // 미디엄 컨테이너 안에 3/4 차지
`;

const WeatherBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 25%; // 미디엄 컨테이너 안에 1/4 차지
  font-size: 17px;
  align-items: center;
  padding-top: 15px;
`;

const CalenderBox = styled.div`
  /* border: 1px gray solid; */
  height: 100px;
`;

const BottomContainer = styled.div`
  width: 100%;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Subtitle = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
`;

const PostBox = styled.div`
  width: 100%;
  padding-top: 20px;
`;

const PlusButton = styled(FaPlusCircle)`
  bottom: 20px;
  right: 20px;
  color: var(--GREEN);
  font-size: 35px;
  cursor: pointer;
`;

const Main = () => {
  const navigate = useNavigate();
  const { addr, temp, sky, pty } = Weather();
  const [selectDate, setSelectDate] = useState(null);
  const [showCalendar, setShowCalender] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const onDateSelect = (date) => {
    setSelectedDate(date);
    console.log("selectedDate", selectedDate);
  };

  // 아이콘 클릭했을 때의 동작 (달력 나타남)
  const handleIconClick = () => {
    setShowCalender(true);
  };

  // 달력에 있는 날짜 선택
  const hadleDateSelect = (date) => {
    setSelectDate(date);
    fetchPostByDate(date); // 날짜에 해당하는 게시글 가져오기
    setShowCalender(false);
  };

  const handlePlusIconClick = () => {
    navigate("/postsubmit");
  };

  const fetchPostByDate = async (selectDate) => {
    try {
      // 선택한 날짜에 해당하는 게시글 가져오는 api 호출 -> 백 코드 생성후 마저 생성 예정.
      const response = await fetch();
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  return (
    <>
      <Container>
        <AdCarousel />
        <CategoryBox>
          <Button label="모든 레져" size="category" />
          <Button label="🏀 농구" size="category" />
          <Button label="🏸 배드민턴" size="category" />
          <Button label="🏓 탁구" size="category" />
        </CategoryBox>
        <DateBox style={{ position: "relative", zIndex: 1 }}>
          {selectedDate.format("YYYY년 MM월 DD일")}
          <FontAwesomeIcon
            icon={faCalendarDays}
            style={{
              color: "var(--GREEN)",
              position: "absolute",
              top: 10,
              right: 20,
            }}
            fontSize="25px"
            cursor="pointer"
            onClick={handleIconClick}
          />
          {showCalendar && (
            <div style={{ position: "relative", zIndex: 1 }}>
              <DatePicker
                selected={selectDate}
                onChange={hadleDateSelect}
                inline
              />
            </div>
          )}
        </DateBox>
        <CalenderBox>
          <CalendarComp
            // onDateSelect={(date) => console.log(date)}
            onDateSelect={onDateSelect}
          />
        </CalenderBox>
        <MediumContainer>
          <CategoryBox2>
            <Button label="모든 지역" size="category" />
            <Button label="강남구" size="category" />
            <Button label="관악구" size="category" />
            <Button label="서초구" size="category" />
          </CategoryBox2>
          <WeatherBox>
            {addr} {temp} {sky === "알 수 없음" ? pty : sky}
          </WeatherBox>
        </MediumContainer>
        <BottomContainer>
          <Subtitle>신나게 운동하자 우리 ☺</Subtitle>
          <PlusButton onClick={handlePlusIconClick} />
        </BottomContainer>
        <PostBox>
          <PostList selectedDate={selectedDate} />
        </PostBox>
      </Container>
    </>
  );
};

export default Main;
