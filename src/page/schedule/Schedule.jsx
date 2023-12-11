import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import CalendarComp from "../../component/CalendarComp";

const Boards = styled.div`
  font-weight: 600;
  color: #999999;
  margin-bottom: 12px;
`;
const Subtitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BoardList = styled.h2`
  text-align: center;
`;
const BoardListContainer = styled.div``;
const Line = styled.div``;

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const onDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div>
        <Boards>
          <>
            <CalendarComp onDateSelect={onDateSelect} />
          </>
          <>
            <Subtitle>
              {selectedDate ? selectedDate.toDate().toDateString() : ""}
            </Subtitle>
          </>
          <BoardListContainer>
            <Line />
            <BoardList />
          </BoardListContainer>
        </Boards>
      </div>
    </>
  );
};

export default Schedule;
