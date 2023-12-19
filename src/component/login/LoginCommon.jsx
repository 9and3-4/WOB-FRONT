import styled from "styled-components";
const InputBar = styled.input`
  margin: 5px;
  border: none;
  border-radius: 30px;
  padding: 15px;
  width: 250px;
`;
const AuthInputBar = styled.input`
  margin: 5px;
  border: none;
  border-radius: 30px;
  padding: 15px;
  width: 160px;
`;

const GreenButton = styled.button`
  background-color: #04bf8a;
  color: #fff;
  margin: 10px;
  border: none;
  border-radius: 30px;
  padding: 10px;
  width: 250px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const BlackButton = styled.button`
  background-color: #353535;
  color: #fff;
  font-size: 13px;
  margin: 10px;
  border: none;
  border-radius: 30px;
  padding: 10px;
  width: 120px;
`;
export { InputBar, AuthInputBar, GreenButton, BlackButton };
