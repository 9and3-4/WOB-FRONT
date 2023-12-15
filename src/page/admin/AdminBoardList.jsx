import React, { useState, useEffect } from "react";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Common from "../../utils/Common";
import SubHeader from "../../layout/SubHeader";
import FullLogoBth from "../../component/admin/FullLogoBtn";

const BoardContainer = styled.div`
    .Logo {
      display: flex;
      align-items: center;
      margin-right: 250px;

      span {
          font-size: 30px;
          font-weight: bold;
      }
    }

  .list {
    width: 100%;
    border: 1px solid #353535;
    th{
      display: flex;
      line-height: 30px;
      justify-content: space-between;
      height: 70px;
      padding: 0 80px;
    }
    tr {
      padding: 20px;
    }
  }
`;

const BoardList = styled.div`
  text-align: center;
  width: 100%;
  border: 1px solid #a91313;
  .data {
    display: flex;
    justify-content: space-between;
    border: 1px solid red;
    

    li {
      width: 200px;
      height: 200px;
      border: 1px solid black;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;




// 게시판 목록 페이지 
const AdminBoardList = () => {
  const [boardList, setBoardList] = useState([]);
  // const navigate = useNavigate();

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

    // 글쓰기 버튼 클릭 시
    // const handleWriteClick = () => {
    //   navigate("/boardWrite");
    // };
    // 글 상세보기 버튼 클릭 시
    // const handleDetailClick = (email) => {
    //   navigate(`/boardDetail/${email}`);
    // };
 
  return (
    <BoardContainer>
      <SubHeader />
      <div className="Logo">
        <FullLogoBth />
          <span>게시판 목록</span>
      </div>
        <table className="list">
          <th>
            <tr>번호</tr>
            <tr>종목</tr>
            <tr>운동 로고</tr>
            <tr>운동 이미지</tr>
          </th>
        </table>

        <BoardList>
        {boardList && 
          boardList.map((data, index) => (
            <ul className="data" key={index} >
              <li>{index + 1}</li>
              <li>{data.name}</li> 
              <li><img src={data.logo} alt="로고" /></li>
              <li><img src={data.img} alt="이미지" /></li>
            </ul>
          ))}
        </BoardList>
    </BoardContainer>
  )
}

export default AdminBoardList;