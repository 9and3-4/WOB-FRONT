import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAxiosApi from "../api/PostAxiosApi";
import PostPreview from "../component/PostPreview";

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
            // PostPreview 컴포넌트를 호출하면서 필요한 데이터를 전달
            <PostPreview
              key={post.id}
              title={post.title}
              date={post.date}
              time={post.time}
              place={post.place}
              people={post.people}
              category={post.category}
            />
          ))}
      </Container>
    </>
  );
};

export default PostList;
