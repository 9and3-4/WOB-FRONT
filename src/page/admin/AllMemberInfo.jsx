// 관리자 회원 관리(전체 회원 조회)
import React, { useState, useEffect } from "react";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Common from "../../utils/Common";
import SubHeader from "../../layout/SubHeader";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import Layout from "../../component/admin/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../utils/Modal";

// 전체 큰 틀css
const BoardContainer = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;

  .Logo {
    display: flex;
    align-items: center;
    margin-right: 120px;

    span {
      font-size: 30px;
      font-weight: bold;
    }
  }

  // 게시판 상단바 목록
  .list {
    width: 100%;
    background-color: #dfede9;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    th {
      display: flex;
      line-height: 30px;
      justify-content: space-between;
      height: 70px;
      padding: 20px 42px;
    }
  }

  // 검색 기능 css
  .lists {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 20px;
    margin-bottom: 15px;

    b {
      margin-right: 350px;
    }
    input {
      display: flex;
      text-align: center;
      border-style: none;
      border-bottom: 1px solid black;
    }
  }
`;

// 게시물 목록 리스트
const BoardLists = styled.div`
  text-align: center;
  width: 100%;
  .data {
    display: flex;
    justify-content: space-between;
    width: 768px;
    border: 2px solid #dfede9;
    border-radius: 10px;

    &:hover {
      background-color: #04bf8a;
    }

    li {
      width: 100px;
      height: 100px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    // 번호, 종목
    p {
      margin-top: 40px;
    }
    // 로고, 이미지
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      padding: 17px;
    }
    button {
      margin-top: 40px;
    }
  }
`;

// 등록 버튼
const Buttons = styled.button`
  border: 1px solid white;
  background-color: white;
  width: 100%;

  button {
    font-weight: 500;
    background-color: #dfede9;
    border: 1px solid #04bf8a;
    border-radius: 5px;
    padding: 15px;
    font-size: 15px;
    margin: 10px 10px;
  }
`;

// 검색 버튼
const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #04bf8a;
  font-size: 23px;
`;
// 활성화 비활성화 버튼 색 구별하기
const TableRow = styled.tr`
  &.active {
    background-color: #dfede9;
  }
  &.inactive {
    background-color: #ddd;
  }
  &.quit {
    background-color: #b9696e96;
  }
  cursor: pointer;
`;
// 모달 버튼 큰 틀
const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
// 모달 버튼
const ModalButton = styled.button`
  margin: 0 20px;
  width: 100px;
  padding: 10px;
  background-color: ${(props) => (props.active ? "#04bf8a" : "#ddd")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#333" : "#04bf8a")};
    color: ${(props) => (props.active ? "#04bf8a" : "white")};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
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

// 회원 목록 페이지
const AllMemberInfo = () => {
  // 맵 돌릴 리스트
  const [userGet, setUserGet] = useState([]); // 회원리스트
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectId, setSelectId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수
  const [num, setNum] = useState(0); // 인덱스 번호

  const navigate = useNavigate();

  // 수정, 등록 시 경로 이동
  const handleClick = (path) => {
    navigate(path);
  };
  // 검색할 시 사용
  const goToSearchPage = () => {
    navigate("searchMain");
  };
  // 행 하나 클릭 시 카테고리 아이디값 받아옴
  const handleRowClick = (id) => {
    setSelectId(id);
    setIsModalOpen(true);
  };
  // 행 하나 눌렀을 때
  const handleRowMouseEnter = (index) => {
    setHoveredRow(index);
  };
  // 행 하나 클릭 후
  const handleRowMouseLeave = () => {
    setHoveredRow(null);
  };
  // 활성화 비활성화 모달 닫음
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectId(null);
  };

  // 총 페이지 수 계산
  useEffect(() => {
    const totalPage = async () => {
      try {
        const res = await AdminAxiosApi.userPageCount(0, 5);
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    totalPage();
  }, []);

  // 게시판 목록 (페이지나누기) -(boardList 회원내용으로바꾸기)
  useEffect(() => {
    const userGet = async () => {
      try {
        const res = await AdminAxiosApi.userPageList(currentPage, 5);
        console.log(res.data);
        setUserGet(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    userGet();
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

  // 게시글 활성화 또는 비활성화 요청 보내기(회원내용)
  const userListState = async (selectId, state) => {
    await AdminAxiosApi.userListState(selectId, state);
    console.log("selectId, state : " + selectId, state);

    // 상태 업데이트 후 선택한 게시글 초기화 또는 다른 업데이트 로직 추가
    setSelectId(null);
    setIsModalOpen(false);
  };

  // 게시판 목록 useEffect
  useEffect(() => {
    const accessToken = Common.getAccessToken();
    const getUserGet = async () => {
      try {
        const rsp = await AdminAxiosApi.userGet();
        setUserGet(rsp.data);
        console.log("userGet데이터 정보 : ", rsp.data);
      } catch (e) {
        if (e.response.status === 401) {
          console.log("결과가 잘 찍히지 않아요");
          await Common.handleUnauthorized();
          const newToken = Common.getAccessToken();
          if (newToken !== accessToken) {
            const rsp = await AdminAxiosApi.userGet();
            console.log("AdminAxiosApi.userGet()", rsp.data);
            setUserGet(rsp.data);
          }
        } else {
          console.log("401 에러 이외의 에러");
        }
      }
    };
    getUserGet();
  }, []);

  return (
    <BoardContainer>
      <SubHeader />
      <div className="Logo">
        <FullLogoBth />
        <span>전체 회원 관리</span>
      </div>
      <div className="lists">
        <b>전체 회원 목록</b>
        <input type="text" placeholder="회원 검색" />
        <SearchIcon icon={faSearch} onClick={goToSearchPage} />
      </div>
      <table className="list">
        <th>
          <tr>번호</tr>
          <tr>이메일</tr>
          <tr>닉네임</tr>
          <tr>활성화/비활성화</tr>
        </th>
      </table>

      <BoardLists>
        {userGet &&
          userGet.map((data, index) => (
            <TableRow
              key={data.id} // 고유한 키 생성
              onClick={() => handleRowClick(data.id)}
              onMouseEnter={() => handleRowMouseEnter(index)}
              onMouseLeave={handleRowMouseLeave}
              isHovered={hoveredRow === index}
              active={data.active} // 추가된 부분: isActive props 전달
              className={data.active} // css에서 색 3가지 중 하나 선택해 색 바꿈
            >
              <ul className="data" key={index}>
                <li>
                  <p>{index + num}</p>
                </li>
                <li>
                  <p>{data.email}</p>
                </li>
                <li>
                  <p>{data.nickname}</p>
                </li>
                <li>
                  <button>활성화/비활성화</button>
                </li>
              </ul>
            </TableRow>
          ))}
        {renderPagination()}
        {isModalOpen && (
          <div>
            <Modal
              open={isModalOpen}
              close={closeModal}
              header={`회원 아이디 : ${selectId}`}>
              <ModalButtonContainer>
                <ModalButton onClick={() => userListState(selectId, "active")}>
                  활동회원
                </ModalButton>
                <ModalButton
                  onClick={() => userListState(selectId, "inactive")}>
                  휴먼회원
                </ModalButton>
                <ModalButton onClick={() => userListState(selectId, "quit")}>
                  탈퇴회원
                </ModalButton>
              </ModalButtonContainer>
            </Modal>
          </div>
        )}
      </BoardLists>

      <Buttons>
        <button onClick={() => handleClick("/AdminMain")}>메인으로가기</button>
      </Buttons>
      {/* 햄버거 토글 사이드바 */}
      <Layout />
    </BoardContainer>
  );
};

export default AllMemberInfo;
