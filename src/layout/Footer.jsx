import { Outlet } from "react-router-dom";
import Home from "../images/Home.png";
import Calendar from "../images/Calendar.png";
import Chat from "../images/Chat.png";
import GPS from "../images/GPS.png";
import MyPage from "../images/MyPage.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 768px;
`;
const FooterIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin: 0 30px;
`;

const Icon = styled.img`
  height: 60px;
`;

const Footer = () => {
  return (
    <Container>
      <FooterIcon>
        <StyledLink to="/">
          <Icon src={Home} alt="Home" />
        </StyledLink>
        <StyledLink to="/schedule">
          <Icon src={Calendar} alt="Calendar" />
        </StyledLink>
        <StyledLink to="/">
          <Icon src={Chat} alt="Chat" />
        </StyledLink>
        <StyledLink to="/map">
          <Icon src={GPS} alt="GPS" />
        </StyledLink>
        <StyledLink to="/MyPage">
          <Icon src={MyPage} alt="MyPage" />
        </StyledLink>
      </FooterIcon>
    </Container>
  );
};

export default Footer;
