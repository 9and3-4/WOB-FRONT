import SettingHeader from "../../layout/SettingHeader";
import styled from "styled-components";

const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  margin: 0px auto;
`;

const PaymentDatails = () => {
  return (
    <>
      <SettingHeader title="결제내역" />
      <Container></Container>
    </>
  );
};
export default PaymentDatails;
