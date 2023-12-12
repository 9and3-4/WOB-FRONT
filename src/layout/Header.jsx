import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  color: --var(MINT);
  align-items: center;
  width: 100%;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
`;

const LogoImage = styled.img`
  cursor: pointer;
  width: 100px;
  margin: 10px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #04bf8a;
  font-size: 23px;
`;

const Header = () => {
  const logoImage =
    "https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/8.png?alt=media&token=1e2813e1-5faf-4090-a86f-5854e8262ae8";

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToSearchPage = () => {
    navigate("searchMain");
  };

  return (
    <>
      <Container>
        <HeaderBox>
          <LogoImage src={logoImage} alt="logo" onClick={goToHome} />
          <SearchIcon icon={faSearch} onClick={goToSearchPage} />
        </HeaderBox>
      </Container>
    </>
  );
};

export default Header;