import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faChild,
  faPersonWalking,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  max-width: 700px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--GREEN);
`;

const DetailBox = styled.div`
  width: 80%;
  min-width: 300px;
  height: 135px;
  background-color: var(--MINT);
  color: var(--BLACK);
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin: 5px;
  cursor: pointer;
`;

const Titlebox = styled.div`
  width: 90%;
  padding-top: 25px;
  padding-left: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const DateBox = styled.div`
  width: 90%;
  padding-top: 15px;
  padding-left: 20px;
`;

const SecondBox = styled.div`
  width: 90%;
  padding-top: 20px;
  padding-left: 15px;
  display: flex;
  justify-content: space-around;
`;

const PlaceBox = styled.div`
  display: flex;
`;

const PeopleBox = styled.div`
  display: flex;
`;

const CategoryBox = styled.div`
  display: flex;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 8px; /* 아이콘과 텍스트 사이의 간격을 조절 */
`;

const PostDetail = () => {
  return (
    <>
      <Container>
        <DetailBox>
          <Titlebox>양재천에서 함께 산책해요!</Titlebox>
          <DateBox>2023-12-17 18:00</DateBox>
          <SecondBox>
            <PlaceBox>
              <Icon icon={faLocationDot} />
              양재천
            </PlaceBox>
            <PeopleBox>
              <Icon icon={faChild} />
              5명
            </PeopleBox>
            <CategoryBox>
              <Icon icon={faPersonWalking} />
              산책
            </CategoryBox>
          </SecondBox>
        </DetailBox>
      </Container>
    </>
  );
};

export default PostDetail;
