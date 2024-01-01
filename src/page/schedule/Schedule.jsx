import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import CalendarComp from "../../component/CalendarComp";
import { useNavigate } from "react-router-dom";
import JoinPost from "./JoinPost";

const BoardContainer = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const JoinCon = styled.div`
  color: #353535;
  display: flex;
  justify-content: center;
  font-size: 2em;
  padding: 20px;
`;

const Boards = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;
const Date = styled.p`
  color: #a6a6a6;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BoardJoin = styled.div``;
const DateCon = styled.div`
  /* width: 768px; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 250px;
`;
const MyPost = styled.button`
  top: 155px;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  width: 7em;
  height: 2em;
  border-radius: 30px;
  background-color: var(--GREEN);
  color: white;
  border: none;
  &:hover {
    color: #353535;
  }
`;

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const onDateSelect = (date) => {
    setSelectedDate(date);
  };
  const navigate = useNavigate();
  const handleMyPostClick = () => {
    navigate("/MyPost");
  };

  return (
    <>
      <div>
        <BoardContainer>
          <Boards>
            <JoinCon>Buddy Schedule</JoinCon>
            <>
              <CalendarComp onDateSelect={onDateSelect} />
            </>
            <>
              <DateCon>
                <Date>{selectedDate.format("YYYY년 MM월 DD일")}</Date>
                <MyPost onClick={handleMyPostClick}>MY POST ▶</MyPost>
              </DateCon>
            </>
            <BoardJoin>
              {/* 선택된 날짜에 따라  */}
              <JoinPost selectedDate={selectedDate} />
            </BoardJoin>
          </Boards>
        </BoardContainer>
      </div>
    </>
  );
};

export default Schedule;
