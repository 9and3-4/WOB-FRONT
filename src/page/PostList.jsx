import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAxiosApi from "../api/PostAxiosApi";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  color: var(--GREEN);
`;

const PostList = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const rsp = await PostAxiosApi.postListAll();
        console.log(rsp.data);
        if (rsp.status === 200) setPostList(rsp.data);
      } catch (error) {
        console.error("Error fetching post list:", error);
      }
    };
    fetchPostList();
  }, []);

  return (
    <>
      <Container>
        {postList &&
          postList.map((post) => (
            <li key={post.id}>
              {post.title}
              {post.date}
              {post.time}
              {post.place}
              {post.cost}
              {post.people}
              {post.detail}
            </li>
          ))}
      </Container>
    </>
  );
};

export default PostList;
