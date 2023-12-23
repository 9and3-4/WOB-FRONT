// 관리자 게시물 목록
import React, { useState, useEffect } from "react";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Common from "../../utils/Common";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import Layout from "../../component/admin/Layout";
import Tr from "../../component/admin/TableElement";

// 전체 큰 틀css
const BoardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;

  .tableBox {
    // 카테고리 목록 css
    p {
      text-align: center;
      font-size: 35px;
      padding-bottom: 50px;
    }
    //table 표
    table {
      margin: 0 auto;
      thead {
        tr {
          th {
            padding: 20px 10px;
          }
        }
      }
      tbody {
        text-align: center;
        tr {
          white-space: nowrap;
        }
      }
    }
  }
`;

// 등록 버튼
const Buttons = styled.div`
  border: 1px solid white;
  background-color: white;
  width: 100%;
  text-align: center;

  button {
    font-weight: 500;
    background-color: #dfede9;
    border: 1px solid #04bf8a;
    border-radius: 10px;
    padding: 15px;
    font-size: 15px;
    margin: 10px 10px;
  }
`;

const PaginationContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  border: 1px solid #ddd;
  padding: 5px;
  width: 28px;
  margin: 0 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkgray;
  }

  &:focus {
    outline: none;
    background-color: royalblue;
  }
`;

// 게시판 목록 페이지
const AllBoardContent = () => {
  // 맵 돌릴 리스트
  const [boardList, setBoardList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수
  const [num, setNum] = useState(0); // 인덱스 번호
  const navigate = useNavigate();

  // 수정, 등록 시 경로 이동
  const handleClick = (path) => {
    navigate(path);
  };

  // 총 페이지 수 계산
  useEffect(() => {
    const totalPage = async () => {
      try {
        const res = await AdminAxiosApi.boardPageCount(0, 5);
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    totalPage();
  }, []);

  // 게시판 목록 (페이지나누기)
  useEffect(() => {
    const boardList = async () => {
      try {
        const res = await AdminAxiosApi.boardPageList(currentPage, 5);
        console.log(res.data);
        setBoardList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    boardList();
  }, [currentPage]);

  // 페이지 이동
  const handlePageChange = (number) => {
    console.log(number);
    setCurrentPage(number - 1);

    // 페이지 변경 시 목록의 순서를 나타내는 코드 추가
    setNum((number - 1) * 5 + 1); // 각 페이지의 첫번째 인덱스 번호
  };

  // 페이지 네이션 버튼
  const renderPagination = () => {
    return (
      <PaginationContainer>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <PageButton key={page} onClick={() => handlePageChange(page)}>
            {page}
          </PageButton>
        ))}
      </PaginationContainer>
    );
  };
  // 게시글 활성화 또는 비활성화 요청 보내기
  const categoryListState = async (selectedId, state) => {
    await AdminAxiosApi.categoryListState(selectedId, state);
    console.log("state, seletedId : " + state, selectedId);

    // 상태 업데이트 후 선택한 게시글 초기화 또는 다른 업데이트 로직 추가
    setSelectedId(null);
    setIsModalOpen(false);
  };

  // 게시판 목록 useEffect
  useEffect(() => {
    const accessToken = Common.getAccessToken();
    const getBoardList = async () => {
      try {
        const rsp = await AdminAxiosApi.boardList();
        console.log("데이터 정보 : ", rsp);
        setBoardList(rsp.data);
      } catch (e) {
        if (e.response.status === 401) {
          console.log("결과가 잘 찍히지 않아요");
          await Common.handleUnauthorized();
          const newToken = Common.getAccessToken();
          if (newToken !== accessToken) {
            const rsp = await AdminAxiosApi.boardList();
            console.log(rsp.data);
            setBoardList(rsp.data);
          }
        } else {
          console.log("401 에러 이외의 에러");
        }
      }
    };
    getBoardList();
  }, []);

  return (
    <BoardContainer>
      <div className="Logo">
        <FullLogoBth />
      </div>

      <div className="tableBox">
        <p>카테고리 목록</p>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>로고</th>
              <th>종목</th>
              <th>이미지</th>
              <th>분류선택</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {/* map으로 반복할 요소 */}
            {boardList &&
              boardList.map((data, index) => (
                <Tr key={data.categoryId} data={data} index={index + num} />
              ))}
          </tbody>
        </table>
      </div>
      {renderPagination()}
      <Buttons>
        <button onClick={() => handleClick("/AdminBoardRegistration")}>
          등록하기
        </button>
        <button onClick={() => handleClick("/AdminMain")}>메인으로가기</button>
      </Buttons>
      {/* 햄버거 토글 사이드바 */}
      <Layout />
    </BoardContainer>
  );
};

export default AllBoardContent;
