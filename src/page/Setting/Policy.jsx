import SettingHeader from "../../layout/SettingHeader";
import styled from "styled-components";

const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  margin: 0px auto;
`;

const Policy = () => {
  return (
    <>
      <SettingHeader title="정책 및 약관" />
      <Container></Container>
    </>
  );
};
export default Policy;
