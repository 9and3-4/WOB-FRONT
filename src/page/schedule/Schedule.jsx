import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import CalendarComp from "../../component/CalendarComp";
import PostList from "../PostListClon";

const Boards = styled.div`
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
const BoardA = styled.div``;

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
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
            <Subtitle>{selectedDate.toDate().toDateString()}</Subtitle>
          </>
        </Boards>
        <BoardA>
          <PostList selectedDate={selectedDate} />
        </BoardA>
      </div>
    </>
  );
};

export default Schedule;
