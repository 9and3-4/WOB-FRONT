import SettingHeader from "../../layout/SettingHeader";
import styled from "styled-components";

const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  height: 1200px;
  margin: 0px auto;
`;

const FreeChat = () => {
  return (
    <>
      <SettingHeader title="자유채팅방" />
      <Container></Container>
    </>
  );
};
export default FreeChat;
