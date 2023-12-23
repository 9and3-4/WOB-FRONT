import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import CalendarComp from "../../component/CalendarComp";
import PostList from "../PostListClon";

const BoardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 1px solid red;
`;
const Boards = styled.div`
  display: flex;
  flex-direction: column;
  color: #999999;
  margin-bottom: 12px;
`;
const Date = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BoardMineCon = styled.div`
  background-color: black;
  position: relative;
  bottom: ${({ isOpen }) => (isOpen ? "0" : "8%")};
  height: 160px;
  overflow: hidden;
  width: 100%;
  border: 3px solid red;
  transition: bottom 0.5s ease-in-out;
`;
const BoardMine = styled.div`
  color: yellow;
  font-size: 3em;
  position: absolute;
  bottom: 8%;
  width: 100%;
  height: 100px;
  /* margin-bottom: 15%; */
  border: 3px solid yellow;
  cursor: pointer;
`;
const BoardJoin = styled.div``;

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [schedule, setschedule] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleBoardMineClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <BoardContainer>
          <Boards>
            <>
              <CalendarComp onDateSelect={onDateSelect} />
            </>
            <>
              <Date>{selectedDate.format("YYYY년 MM월 DD일")}</Date>
            </>
            <BoardJoin>
              {/* 선택된 날짜에 따라  */}
              <PostList selectedDate={selectedDate} />
            </BoardJoin>
          </Boards>
          <BoardMineCon isOpen={isOpen}>
            <BoardMine onClick={handleBoardMineClick}>
              내가 쓴 글 보기 부분
            </BoardMine>
            <PostList selectedDate={selectedDate} />
          </BoardMineCon>
        </BoardContainer>
      </div>
    </>
  );
};

export default Schedule;
