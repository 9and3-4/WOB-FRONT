import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAxiosApi from "../api/PostAxiosApi";
import { useParams } from "react-router-dom";
import KakaoMap from "../component/Map";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import ChatStart from "../component/ChatStart";
import Payment from "../component/Payment";

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
  height: 300px;
  border: 1px solid gray;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const TitleBox = styled.div`
  height: 40px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const TextBox = styled.div`
  height: 30px;
  padding: 10px 10px;
`;

const ButtonBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
`;

const ContentButton = styled.button`
  padding: 15px;
  background-color: var(--MINT);
  border-radius: 20px;
  border: none;
  margin: 5px;
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

const PostDetail = () => {
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
  return (
    <Container>
      <ContentBox>
        <Header />
        <PictureCon>{post.categoryImage}</PictureCon>
        <TitleBox> {post.title} </TitleBox>
        <TextBox>카테고리 {post.categoryName}</TextBox>
        <KakaoMap />
        <TextBox>
          장소 {post.local} {post.place}
        </TextBox>
        <TextBox>
          일시 {post.date} {post.time}
        </TextBox>
        <TextBox>모집 인원 {post.people}명</TextBox>
        <TextBox>참여인원</TextBox>
        <TextBox>예상 비용 {post.fee}원</TextBox>
        <TextBox>일정 소개 {post.introduction}</TextBox>
        <ButtonBox>
          <ContentButton>문의하기</ContentButton>
          <ContentButton>결제하기</ContentButton>
          <ContentButton>일정 추가</ContentButton>
        </ButtonBox>
      </ContentBox>
      <FooterBox>
        <Footer />
      </FooterBox>
    </Container>
  );
};

export default PostDetail;
