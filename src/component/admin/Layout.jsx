// 관리자 햄버거 버튼 사이드바
import { Outlet } from "react-router-dom";
import {
  Container,
  StyledSideMenu,
  UserContainer,
  UserImage,
  UserIdAndName,
  List,
  StyledMenuList,
  Dummy,
} from "../admin/LayoutStyles";
import { UserContext } from "../../context/UserStore";
import { useContext, useState, useEffect } from "react";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


// 사이드바 메뉴를 구성 합니다.
  const Layout = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
//   const { name } = context;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [member, setMember] = useState({});

  // 메인에서 sub메뉴의 버튼 누르면 그 화면으로 이동 
  const handleAreaNavigate = (path) => {
    navigate(path)
    };

    // 햄버거 토글 위치(열리고 닫히고)
  const onClickLeft = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 메인 메뉴 누르면 이동하는 페이지
  const onClickMenu = (num) => {
    switch (num) {
      case 1:
        navigate("/AllMemberInfo");
        break;
      case 2:
        navigate("/AllPaymentContent");
        break;
      case 3:
        navigate("/AllBoardContent");
        break;
      case 4:
        navigate("/Advertising");
        break;
      case 5:
        navigate("/AskContent");
        break;
      default:
    }
  };

//   useEffect(() => {
//     const accessToken = Common.getAccessToken();
//     const getMember = async () => {
//       try {
//         const rsp = await AxiosApi.memberGetInfo();
//         setMember(rsp.data);
//       } catch (e) {
//         if (e.response.status === 401) {
//           await Common.handleUnauthorized();
//           const newToken = Common.getAccessToken();
//           if (newToken !== accessToken) {
//             const rsp = await AxiosApi.memberGetInfo();
//             setMember(rsp.data);
//           }
//         }
//       }
//     };
//     getMember();
//   }, [name]);

  return (
    <Container>
      <header className="mainhead">
        {/* 헴버거 버튼 */}
        <div className="hambeger">
          {isMenuOpen ? (
            <GiCancel size={32} color="#04BF8A" onClick={onClickLeft} />
          ) : (
            <GiHamburgerMenu size={32} color="#04BF8A" onClick={onClickLeft} />
          )}
        </div>
        {/* 햄버거 토글로 열고 닫힘 */}
        <StyledSideMenu
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(false)}
        >
        {/* 햄버거 사이드바 맨 위 환영 인사 */}
        <div className="welcome">
            <span style={{ fontWeight: "bold" }}>{member.name}</span>님
                환영합니다.
        </div>
          <StyledMenuList>
            {/* 프로필 이미지 */}
            <UserContainer>
              <UserImage
                src={member.image || "http://via.placeholder.com/160"}
                alt="User"
              />
              {/* 관리자 id와 이름 */}
              <UserIdAndName>
                <sapn>{member.name}</sapn>
                <span>{member.email}</span>
              </UserIdAndName>
            </UserContainer>

            {/* 사이드바 인에 내용 리스트 */}
            <List>
            <li>
                <div className="m-title" onClick={() => onClickMenu(1)}>
                    전체 회원 관리
                </div>
                <ul className="sub-menu">
                    <li onClick={() => handleAreaNavigate("/AllMemberInfo","allMemberList")}>전체 회원 목록</li>
                    <li onClick={() => handleAreaNavigate("/AdminVisitorStatus","visitMember")}>방문자 현황</li>
                    <li onClick={() => handleAreaNavigate("/StockRatioByRegion","regionGrap")}>지역별 종목 비율</li>
                    <li onClick={() => handleAreaNavigate("/SearchKeyword","clickKeyword")}>검색 키워드 높은 순</li>
                </ul>
            </li>
            <li>
                <div className="m-title" onClick={() => onClickMenu(2)}>
                    전체 결제 내역 관리
                </div>
                <ul className="sub-menu">
                    <li onClick={() => handleAreaNavigate("/AllPaymentContent")}>전체 결제 승인 모아보기</li>
                    <li onClick={() => handleAreaNavigate("/PaymentList")}>전체 결제 내역 목록</li>
                    <li onClick={() => handleAreaNavigate("/AllPaymentGraph")}>전체 결제 내역 그래프</li>
                </ul>
            </li>
            <li>
                <div className="m-title" onClick={() => onClickMenu(3)}>
                    전체 게시판 관리
                </div>
                <ul className="sub-menu">
                    <li onClick={() => handleAreaNavigate("/AllBoardContent")}>전체 게시판 목록</li>
                    <li onClick={() => handleAreaNavigate("/AdminBoardRegistration")}>전체 게시물 등록/수정/삭제</li>
                </ul>
            </li>
            <li>
                <div className="m-title" onClick={() => onClickMenu(4)}>
                    광고 관리
                </div>
                <ul className="sub-menu">
                    <li onClick={() => handleAreaNavigate("/Advertising")}>광고 관리하기</li>
                </ul>
            </li>
            <li>
                <div className="m-title" onClick={() => onClickMenu(5)}>
                    1:1 문의하기
                </div>
                <ul className="sub-menu">
                    <li onClick={() => handleAreaNavigate("/AskContent")}>관리자 전용 전체 채팅방 목록</li>
                    <li onClick={() => handleAreaNavigate("/AdminChat")}>1:1 관리자 채팅 문의</li>
                </ul>
            </li>
                <div className="logoBox">
                    <img src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/%E1%84%80%E1%85%A1%E1%86%AB%E1%84%83%E1%85%A1%E1%86%AB%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9-removebg-preview.png?alt=media&token=bebc4ce9-fa8d-4d5a-9880-faec9cfd382e" alt="Logo" width="100px"/>
                </div>
            </List>
        </StyledMenuList>
        </StyledSideMenu>
        </header>

        <main onClick={() => setIsMenuOpen(false)}>
        <Dummy />
        <Outlet />
      </main>
    </Container>
  );
};

export default Layout;