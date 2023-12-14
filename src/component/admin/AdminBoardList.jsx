// 관리자 게시판 관리 - 목록보기
import React, { useState, useEffect } from "react";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BoardContainer = styled.div`
  padding: 0 30px;
  position: relative;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const BoardUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BoardImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 15px; // 이미지와 텍스트 사이의 간격을 조정하세요
`;

const BoardLi = styled.li`
  background-color: #f2f2f2;
  margin: 10px 0;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex; // 내부 요소들을 flex로 배치합니다.
  align-items: center; // 세로 중앙 정렬
`;

const BoardTitle = styled.h2`
  font-size: 1.4em;
  color: #007bff;
  margin: 0 0 10px;
`;

const BoardContent = styled.p`
  color: #444;
  font-size: 1em;
`;

const BoardDate = styled.p`
  color: #777;
  font-size: 0.8em;
  text-align: right;
`;

const BoardContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding-top: 10px;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserId = styled.span`
  color: #555;
  font-style: italic;
  font-size: 13px;
`;

const WriteButton = styled.button`
  position: fixed; // 버튼을 부모 컨테이너에 대해 절대적 위치로 설정
  bottom: 24px;
  right: 30px;
  z-index: 10;

  width: 60px; // 버튼의 크기를 정사각형으로 설정
  height: 60px; // 버튼의 크기를 정사각형으로 설정
  border-radius: 50%; // 동그란 모양으로 만들기 위해 반지름을 50%로 설정

  display: flex; // Flexbox 레이아웃 사용
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬

  background-color: #1da1f2; // 트위터 색상
  color: white;
  font-size: 30px; // 플러스 기호 크기
  line-height: 1; // 기본 라인 높이 제거
  // 그림자 효과
  box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.4);

  border: none; // 기본 테두리 제거
  cursor: pointer;
  outline: none; // 클릭 시 테두리 제거

  &:hover {
    background-color: #1991db; // 호버 시 배경색 변경
  }

  &:before {
    // 가상 요소로 플러스 기호 생성
    content: "+";
  }
`;

function AdminBoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const boardList = async () => {
      try {
        const rsp = await AdminAxiosApi.boardList();
        console.log(rsp.data);
        setBoardList(rsp.data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally");
      }
    };
    boardList();
  }, []);

  // 글쓰기 버튼 클릭 시
  const handleWriteClick = () => {
    navigate("/AdminBoardWrite");
  };
  // 글 상세보기 버튼 클릭 시
  const handleDetailClick = (id) => {
    navigate(`/AdminBoardDetail/${id}`);
  };

  return (
    <BoardContainer>
      <Title>게시판 목록</Title>
      <BoardUl>
        {boardList &&
          boardList.map((board) => (
            <BoardLi
              key={board.boardId}
              onClick={() => handleDetailClick(board.boardId)}
            >
              <BoardImage
                src={board.img ? board.img : "http://via.placeholder.com/160"}
                alt="Board image"
              />
              <BoardContentWrapper>
                <BoardHeader>
                  <BoardTitle>{board.title}</BoardTitle>
                  <UserId>{board.userId}</UserId>
                </BoardHeader>
                <BoardContent>{board.content}</BoardContent>
                <BoardDate>{board.regDate}</BoardDate>
              </BoardContentWrapper>
            </BoardLi>
          ))}
      </BoardUl>
      <WriteButton onClick={handleWriteClick}></WriteButton>
    </BoardContainer>
  );
}

export default AdminBoardList;
