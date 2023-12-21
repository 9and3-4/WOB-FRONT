import SettingHeader from "../../layout/SettingHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Common from "../../utils/Common";
import SettingAxiosApi from "../../api/SettingAxiosApi";
const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  margin: 0px auto;
`;

const SettingBtn = styled.button`
  width: 100%;
  height: 100px;
  display: flex;
  position: relative;
  align-items: center;
  background-color: transparent; // 버튼 배경 없애기
  border: none;
  cursor: pointer;

  img {
    width: 55px;
    height: 55px;
    margin-left: 50px;
  }

  .text {
    margin-left: 50px;
    font-size: 26px;
  }
  .pointer {
    position: absolute;
    right: 50px;
    font-size: 30px;
  }
`;

const Setting = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState();

  // 채팅방 생성
  const handleCreateChatRoom = async (title) => {
    // 1. 해당 게시글의 roomId 값 조회
    const rsp = await SettingAxiosApi.postListById(7); // postId 값 전달
    console.log("해당 게시글의 roomId 조회 : " + rsp.data.roomId);
    setRoomId(rsp.data.roomId);
    console.log("setRoomId : " + roomId);
    // 2. 해당 게시글의 roomId가 공백이면 ( 첫 채팅방 생성 ) 채팅방 생성하기.
    if (rsp.data.roomId === null) {
      const accessToken = Common.getAccessToken();
      try {
        // 채팅방 제목 전달하여 roomId 받아오기
        const response = await SettingAxiosApi.chatCreate(title, 7);
        const req = await SettingAxiosApi.postAddRoomId(7, response.data);
        console.log("rsq.data : ", req.data);
        navigate(`/Chatting/${response.data}`);
      } catch (e) {
        if (e.response.status === 401) {
          await Common.handleUnauthorized();
          const newToken = Common.getAccessToken();
          if (newToken !== accessToken) {
            const response = await SettingAxiosApi.chatCreate(title);
            navigate(`/Chatting/${response.data}`);
          }
        }
      }
    } else {
      // 만약 이미 채팅방이 생성되어 있다면, 새로 생성하지 않고 채팅방 입장.
      navigate(`/Chatting/${rsp.data.roomId}`);
    }
  };

  return (
    <>
      <SettingHeader title="환경설정" />
      <Container>
        <SettingBtn onClick={() => navigate("/Account")}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/person.png?alt=media&token=18faf370-c600-429b-acfe-a9202ec49dee"
            alt="계정관리"
          />
          <span className="text">계정관리</span>
          <span className="pointer">&gt;</span>
        </SettingBtn>
        <SettingBtn onClick={() => navigate("/Questions")}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/question.png?alt=media&token=90479a46-00a2-4e88-b367-c22a1acd6c10"
            alt="문의하기"
          />
          <span className="text">문의하기</span>
          <span className="pointer">&gt;</span>
        </SettingBtn>
        <SettingBtn onClick={() => handleCreateChatRoom("일반채팅방")}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/won.png?alt=media&token=6e1058ae-9f43-4c10-add5-6e2f1a79531e"
            alt="결제내역"
          />
          <span className="text">결제내역</span>
          <span className="pointer">&gt;</span>
        </SettingBtn>
        <SettingBtn onClick={() => navigate("/Policy")}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/insurance.png?alt=media&token=09236ab0-25ed-41b6-b0d5-ea45e88b87e4"
            alt="정책및약관"
          />
          <span className="text">정책 및 약관</span>
          <span className="pointer">&gt;</span>
        </SettingBtn>
      </Container>
    </>
  );
};
export default Setting;
