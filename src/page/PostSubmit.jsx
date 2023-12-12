import React from "react";
import styled from "styled-components";
import SubHeader from "../layout/SubHeader";

const Container = styled.div`
  max-width : 768px;
  min-width : 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;    
`;

const TitleBox = styled.div`
    width: 100px;
    height: 100px;
    font-size: 30px;
    font-weight: bold;

`;


const PostSubmit = () => {
    return(
        <>
        <SubHeader />
        <Container>
        <TitleBox>일정 등록</TitleBox>
        </Container>
        </>
    );
};

export default PostSubmit;