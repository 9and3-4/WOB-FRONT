// 관리자 햄버거 버튼 사이드바 css
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 768px;
  min-height: 100vh;
  width: 100vw;
  margin: auto;
  

  .mainhead {
    display: flex;
    align-items: center;
    position: fixed;
    height: 54px;
    width: 100%;
    z-index: 100;
    top: 0;
    left: 0;

    // 환영 인사 css
    .welcome {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      color: #353535;

    /* 햄버거 버튼 css */
    .hambeger {
      position: relative;
    }
    }
  }
  .mainbody {
    height: calc(100vh - 54px - 50px);
  }
`;

export const UserContainer = styled.div`
  display: flex;
  margin: 40px 20px 20px;
  align-items: center;
`;
/* 프로필 이미지 */
export const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;
/* 관리자 id와 이름 */
export const UserIdAndName = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin: 2px 10px;
  line-height: 1.5;
`;
// 햄버거 토글 안 목록 
export const List = styled.ul`
    margin: 30px;
    position: relative;
    .m-title {
        font-size: 20px;
        font-weight: bold;
        line-height: 60px;
        cursor: pointer;
        position: relative;
    }
    .sub-menu {
       line-height: 30px;
        cursor: pointer;
        position: relative;
        /* text-align: center; */
    }
    .logoBox {
        display:flex;
        justify-content: end;
    }
`;
// 햄버거 사이드메뉴 움직이는 css
export const StyledSideMenu = styled.div`
  position: fixed;
  left: 0;
  top: 54px;
  width: 350px;
  height: calc(100vh - 54px);
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  background-color: #dceae6;
`;

export const StyledMenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Dummy = styled.div`
  height: 54px;
`;

export default Container;