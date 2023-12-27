import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAxiosApi from "../api/PostAxiosApi";
import MyPageAxiosApi from "../api/MyPageAxiosApi";
import { useParams } from "react-router-dom";
import PostMap from "../component/PostMap";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Payment from "../component/Payment";
import ChatStart from "../component/ChatStart";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  color: var(--BLACK);
`;

const ContentBox = styled.div`
  margin-bottom: 15%;
`;

const PictureCon = styled.div`
  height: auto;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
`;

const TitleBox = styled.div`
  margin-top: 10px;
  height: 40px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const TextBox = styled.div`
  height: 30px;
  padding: 10px 5px;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ContentButton = styled.button`
  margin: 10px;
  width: 90px;
  height: 45px;
  background-color: var(--MINT);
  border-radius: 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const FooterBox = styled.div`
  height: 90px;
  background-color: white;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0px;
`;

const PostDetail = ({ categoryImage }) => {
  const { postId } = useParams(); //postId를 url에서 받아옴
  const [post, setPost] = useState("");
  const [postNum, setPostNum] = useState("");

  useEffect(() => {
    const getPostDetail = async () => {
      console.log("포스트 아이디 : " + postId);
      try {
        const rsp = await PostAxiosApi.postListById(postId);
        console.log("postId값 postDetail에서 data 받아지나?", postId);
        console.log("서버 응답:", rsp.data); // 서버 응답 확인
        // const setPostNum = localStorage.postId;
        setPost(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (postId) {
      getPostDetail();
    }
  }, [postId]);
  // if (!post) return <></>;

  const handleAddSchedule = async () => {
    try {
      const email = localStorage.getItem("email"); // 사용자 이메일 가져오기
      const accessToken = localStorage.getItem("accessToken");

      if (!email || !accessToken) {
        // 로그인이 필요한 경우
        console.log("로그인이 필요합니다.");
        return;
      }

      const response = await MyPageAxiosApi.join(email, postId); // MyPageAxiosApi.join 호출
      console.log("일정 추가 결과 이메일, 포스트아이디:", email, postId);
      console.log("일정 추가 결과:", response.data);
      // 성공했을 때 필요한 로직 추가
    } catch (error) {
      // 에러 처리 로직 추가
      console.error("내일정 추가 에러:", error);
    }
  };

  return (
    <Container>
      <ContentBox>
        <Header />
        <PictureCon>
          {/* <Image src={post.categoryImage} alt="카테고리 이미지" /> */}
          <Image
            src={post.type === "lesson" ? post.image : post.categoryImage}
            alt="이미지"
          />
        </PictureCon>
        <TitleBox> {post.title} </TitleBox>
        <TextBox>종목 {post.categoryName}</TextBox>
        <TextBox>유형 {post.type}</TextBox>
        <PostMap />
        <TextBox>장소 {post.place}</TextBox>
        <TextBox>
          일시 {post.date} {post.time}
        </TextBox>
        <TextBox>모집 인원 {post.people}명</TextBox>
        <TextBox>예상 비용 {post.fee}원</TextBox>
        <TextBox>일정 소개 {post.introduction}</TextBox>
        <ButtonBox>
          {post.type === "normal" && (
            <ChatStart postId={postId}>문의하기</ChatStart>
          )}
          {post.type === "lesson" && <Payment>결제하기</Payment>}
          <ContentButton onClick={handleAddSchedule}>일정추가</ContentButton>
        </ButtonBox>
      </ContentBox>
      <FooterBox>
        <Footer />
      </FooterBox>
    </Container>
  );
};

export default PostDetail;
