// 관리자 광고 관리(광고 관리하기)
import styled from "styled-components";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import SubHeader from "../../layout/SubHeader";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../component/admin/Layout";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import Common from "../../utils/Common";
import { useEffect,useState } from "react";
import Modal from "../../utils/Modal";


const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .Logo {
    display: flex;
    align-items: center;

        span {
            font-size: 30px;
            font-weight: bold;
            margin: 80px;
        }
  }
  .Board {
    border: 1px solid #353535;
    border-radius: 10px;
    margin: 20px 20px;
    padding: 0 20px;
    th {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 30px 40px;
        font-size: 25px;
        color: #353535;
        font-weight: bold;
    }
    td{
        background-color: #DFEDE9;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0px;
        padding: 20px 20px;
        border-radius: 10px;
    }
}
`;

const MemberBoard = styled.div`
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
      
      p {
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

const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #04bf8a;
  font-size: 23px;
  `;

const TableRow = styled.tr`
background-color: ${(props) => (props.isHovered ? "#eee" : "transparent")};
color: ${(props) => (props.isHovered ? "#ed342e" : "inherit")};
cursor: pointer;

${(props) => {
    if (props.isActive === "inactive") {
    return `
        background-color: #fdffcb;
    `;
    } else if (props.isActive === "quit") {
    return `
        background-color: #bbb;
    `;
    }
    return "";
}}
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


const Advertising = () => {
   // 맵 돌릴 리스트
   const [boardList, setBoardList] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [hoveredRow, setHoveredRow] = useState(null);
   const [selectedUser, setSelectedUser] = useState(null);
 
   const navigate = useNavigate();
 
   // 수정, 등록 시 경로 이동
   const handleClick = (path) => {
     navigate(path)
   };
   // 검색할 시 사용
   const goToSearchPage = () => {
     navigate("searchMain");
   };
 
   const handleRowClick = (user) => {
     setSelectedUser(user);
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
     setSelectedUser(null);
   };
 
   const manageCategoryListState = async (state) => {
     await AdminAxiosApi.manageCategoryListState(state, selectedUser);
     const updatedBoardList = await AdminAxiosApi.boardList();
     setBoardList(updatedBoardList.data); // 상태가 변경될 때마다 데이터 다시 불러오기
     setIsModalOpen(false);
   };
 
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

    return (
        <Container>
            <SubHeader />
            <div className="Logo">
                <FullLogoBth />
                <span>광고 관리</span>
            </div>
            <MemberBoard>
                <div className="lists">
                    <p>전체 광고 관리</p>
                    <input type="text" placeholder="광고 검색" />
                    <SearchIcon icon={faSearch} onClick={goToSearchPage} />
                </div>
                <table className="list">
                <th>
                    <tr>번호</tr>
                    <tr>광고이름</tr>
                    <tr>광고이미지</tr>
                    <tr>광고내용</tr>
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
                    <li><p>{data.adName}</p></li>
                    <li><p>{data.adImage}</p></li> 
                    <li><p>{data.adContent}</p></li>
                    <li><button>버튼</button></li>
                    </ul>

                    </TableRow>
                ))}
                {isModalOpen && (
                <div>
                <Modal
                    open={isModalOpen}
                    close={closeModal}
                    header={`customer id : ${selectedUser}`}
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
            <Buttons>
            <button onClick={() => handleClick("/AdminBoardModify")}>수정하기</button>
            <button>삭제하기</button>
            <button onClick={() => handleClick("/AdminBoardRegistration")}>등록하기</button>
            </Buttons>
           </MemberBoard>
           {/* 햄버거 토글 사이드바 */}
           <Layout/>
        </Container>
    )
};

export default Advertising;