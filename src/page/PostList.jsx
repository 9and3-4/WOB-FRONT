import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostAxiosApi from "../api/PostAxiosApi";
import PostPreview from "../component/PostPreview";
import PostTopBar from "../component/PostTopBar";

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
  const [selectedArea, setSelectedArea] = useState([]);

  // 이 함수를 PostTopBar로 전달하여 선택된 지역을 업데이트
  const handleAreaSelect = (selectedOptions) => {
    setSelectedArea(selectedOptions);
  };

  // selectsports 변경시 실행
  useEffect(() => {
    const fetchPostList = async (selectedOptions) => {
      try {
        // 서버에서 게시판 목록 들고옴.
        const rsp = await PostAxiosApi.postListAll();
        console.log(rsp.data);
        // 서버가 정상적으로 이루어졌을 때
        if (rsp.status === 200) {
          // 선택 지역에 따라 필터링
          const filterArea =
            (selectedArea || []).length === 0
              ? rsp.data
              : rsp.data.filter((post) => selectedArea.includes(post.place));
          // 게시글 목록 상태 업데이트
          setPostList(filterArea);
        }
      } catch (error) {
        console.error("Error fetching post list:", error);
      }
    };
    // 비동기 함수 호출
    fetchPostList();
  }, [selectedArea]); // selectedSports가 변경될 때마다 실행

  return (
    <>
      <Container>
        <PostTopBar onAreaSelect={handleAreaSelect} />
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
