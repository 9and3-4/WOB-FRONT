import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  color: var(--GREEN);
`;

const AdBox = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid gray;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px;
`;

const AdSubmit = () => {
  return (
    <>
      <Container>
        <AdBox>
          <Title>광고 정보 기재</Title>
        </AdBox>
      </Container>
    </>
  );
};

export default AdSubmit;
