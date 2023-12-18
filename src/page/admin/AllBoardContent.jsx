// 관리자 게시물 목록
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
import AdminBoardDetail from "./AdminBoardDetail";
import AdminBoardModify from "./AdminBoardModify";


// 전체 큰 틀css
const BoardContainer = styled.div`
    max-width: 768px;
    min-width: 300px;
    margin: 0 auto;

    .Logo {
      display: flex;
      align-items: center;
      margin-right:120px; 

      span {
          font-size: 30px;
          font-weight: bold;
      }
    }

  // 게시판 상단바 목록
    .list {
      width: 100%;
      background-color: #DFEDE9;
      border-radius: 10px;
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      th{
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
    border: 2px solid #DFEDE9;
    border-radius: 10px;

    &:hover {
      background-color: #04BF8A;
    }
    
    li {
      width: 100px;
      height: 100px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    // 번호, 종목 
    p {
      margin-top:40px;
      }
    // 로고, 이미지
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      padding: 17px;
    }
    button {
      margin-top:40px;
    }
  }
`;

// 등록, 삭제, 수정버튼
const Buttons = styled.button`
    border: 1px solid white;
    background-color: white;
    width: 100%;

    button {
      font-weight: 500;
      background-color: #DFEDE9;
      border: 1px solid #04BF8A;
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

const TableRow = styled.tr`
  background-color: ${(props) => (props.isHovered ? "#04bf8a" : "transparent")};
  color: ${(props) => (props.isHovered ? "#ed342e" : "inherit")};
  //background-color: ${(props) => (props.isActive === "inactive" ? "#ed342e" : "transparent")};
  cursor: pointer;

  ${(props) => {
      if (props.isActive === "active") {
        return `
          background-color: #ced417;
        `;
      } else if (props.isActive === "inActive") {
        return `
          background-color: #500c0c;
        `;
      }
      return "transparent";
   }}
    `;

    const ModalButtonContainer = styled.div`
      display: flex;
      justify-content: center;
      `;
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

    const FunctionContainer = styled.div`

    `;

    const Modify = styled.div``; 
    const Modals = styled.div``; 

// 게시판 목록 페이지 
const AllBoardContent = () => {

  // 맵 돌릴 리스트
  const [boardList, setBoardList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [board, setBoard] = useState([]);
  const email = window.localStorage.getItem("email");

  const [modalOpen, setModalOpen] = useState(false);
  const [modlaMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  // 수정, 등록 시 경로 이동
  const handleClick = (path) => {
    navigate(path)
  };
  // 검색할 시 사용
  const goToSearchPage = () => {
    navigate("searchMain");
  };

  const handleRowClick = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleRowMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleRowMouseLeave = () => {
    setHoveredRow(null);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setModalOpen(false);
  };

  // 게시글 활성화 또는 비활성화 요청 보내기
  const manageCategoryListState = async (state,selectedId) => {
    await AdminAxiosApi.manageCategoryListState(state, selectedId);
    console.log("state, seletedId : " + state, selectedId);
    // 상태 업데이트 후 선택한 게시글 초기화 또는 다른 업데이트 로직 추가
    setSelectedId(null); 
    setIsModalOpen(false);
  };

  // 게시판 목록 useEffect
  useEffect(() => {
    const accessToken = Common.getAccessToken();
    const getBoardList = async() => {
      try {
        const rsp = await AdminAxiosApi.boardList();
        console.log("데이터 정보 : ",rsp.data);
        setBoardList(rsp.data);
      }catch (e) {
        if (e.response.status === 401) {
          console.log("결과가 잘 찍히지 않아요")
          await Common.handleUnauthorized();
          const newToken = Common.getAccessToken();
          if (newToken !== accessToken) {
            const rsp = await AdminAxiosApi.boardList();
            console.log(rsp.data);
            setBoardList(rsp.data);
          }
        }
        else {
          console.log("401 에러 이외의 에러")
        }
      }
    };
    getBoardList();
  }, []);

  // 게시판 수정 
    const BoardModify = async (name, logo, image) => {
      console.log("BoardModify : " + name + " " + logo + " " + image + " ");
      const rsp = await AdminAxiosApi.boardModify(name, logo, image);
      if (rsp.data === true) {
        const rsp = await AdminAxiosApi.boardList();
        if (rsp.status === 200) setBoard(rsp.data);
        console.log(rsp.data);
      }else {
        setModalOpen(true);
        setModalMessage("수정 실패");
      }
    } ;

  // 게시판 삭제 
    const BoardDelete = async (categoryId) => {
      const rsp = await AdminAxiosApi.boardDelete(categoryId);
      console.log(rsp.data);
      if (rsp.data === true) {
        const rsp = await AdminAxiosApi.boardList();
        if (rsp.status === 200) setBoard(rsp.data);
        console.log(rsp.data);
      }else {
        setModalOpen(true);
        setModalMessage("삭제 실패");
      }
    };
 
  return (
    <BoardContainer>
      <SubHeader />
      <div className="Logo">
        <FullLogoBth />
          <span>게시판 목록</span>
      </div>
      <div className="lists">
          <b>전체 게시판 목록</b>
          <input type="text" placeholder="종목 검색" />
          <SearchIcon icon={faSearch} onClick={goToSearchPage} />
      </div>
        <table className="list">
          <th>
            <tr>번호</tr>
            <tr>로고</tr>
            <tr>종목</tr>
            <tr>이미지</tr>
            <tr>버튼</tr>
          </th>
        </table>

        <BoardLists>
        {boardList && 
          boardList.map((data, index) => (
            <TableRow
            key={data.id}
            onClick={() => handleRowClick(data.id)}
            onMouseEnter={() => handleRowMouseEnter(index)}
            onMouseLeave={handleRowMouseLeave}
            isHovered={hoveredRow === index}
            isActive={data.isActive} // 추가된 부분: isActive props 전달
          >

            <ul className="data" key={index} >
              <li><p>{index + 1}</p></li>
              <li><img src={data.logo} alt="로고" /></li>
              <li><p>{data.name}</p></li> 
              <li><img src={data.image} alt="이미지" /></li>
              <li><button manageCategoryListState={manageCategoryListState}>버튼</button></li>
            </ul>

            </TableRow>
          ))}
           {isModalOpen && (
        <div>
          <Modal
            open={isModalOpen}
            close={closeModal}
            header={`customer id : ${selectedId}`}
          >
            <ModalButtonContainer>
              <ModalButton onClick={() => manageCategoryListState("active")}>
                active
              </ModalButton>
              <ModalButton onClick={() => manageCategoryListState("inactive")}>
                inactive
              </ModalButton>
              <ModalButton onClick={() => manageCategoryListState("quit")}>
                quit
              </ModalButton>
            </ModalButtonContainer>
          </Modal>
        </div>
      )}
        </BoardLists>
        
        <FunctionContainer>
          <Modify boardModify={AdminBoardModify}></Modify>
          
          <Modals open={modalOpen} close={closeModal} header="오류">{modlaMessage}</Modals>
        </FunctionContainer>

        <Buttons>
          <button onClick={() => handleClick("/AdminBoardModify")}>수정하기</button>
          <button>삭제하기</button>
          <button onClick={() => handleClick("/AdminBoardRegistration")}>등록하기</button>
        </Buttons>
        {/* 햄버거 토글 사이드바 */}
        <Layout />
    </BoardContainer>
  )
}

export default AllBoardContent;
