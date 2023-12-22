import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAxiosApi from "../api/PostAxiosApi";
import { useParams } from "react-router-dom";
import KakaoMaps from "./map/Maps";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  color: var(--GREEN);
`;
const PictureCon = styled.div`
  height: 300px;
  border: 1px solid gray;
`;
const Title = styled.div`
  height: 40px;
  border: 1px solid gray;
`;
const Category = styled.div`
  height: 40px;
  border: 1px solid gray;
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
      <PictureCon>사진</PictureCon>
      <Title> 제목 {post.title} </Title>
      <Category>카테고리 {post.categoryName}</Category>
      <KakaoMaps />
      <Title>장소</Title>
      <Title>일시</Title>
      <Title>모임인원</Title>
      <Title>참여인원</Title>
      <Title>예상비용</Title>
      <Title>일정소개</Title>
      <Title>참여하기 요청 버튼</Title>
    </Container>
  );
};

export default PostDetail;
