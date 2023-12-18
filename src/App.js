import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from "./page/schedule/Schedule";
import CalendarComp from "./component/CalendarComp";
import GlobalStyle from "./globalStyle";
import Main from "./page/Main";
import Layout from "./layout/Layout";
import MyPageEdit from "./page/MyPageEdit";
import KakaoMaps from "./page/map/Maps";
import PostSubmit from "./page/PostSubmit";
import AdminMain from "./page/admin/AdminMain";
import Advertising from "./page/admin/Advertising";
import AllBoardContent from "./page/admin/AllBoardContent";
import AllMemberInfo from "./page/admin/AllMemberInfo";
import AllPaymentContent from "./page/admin/AllPaymentContent";
import AskContent from "./page/admin/AskContent";
import TestLoginPage from "./page/Login";
import AdminBoardRegistration from "./page/admin/AdminBoardRegistration";
import AdminVisitorStatus from "./page/admin/AdminVisitorStatus";
import StockRatioByRegion from "./page/admin/StockRatioByRegion";
import SearchKeyword from "./page/admin/SearchKeyword";
import AllPaymentList from "./page/admin/AllPaymentList";
import AllPaymentGraph from "./page/admin/AllPaymentGraph";
import AdminChat from "./page/admin/AdminChat";
import InterestEnter from "./page/interestEnter";
import PostList from "./page/PostList";
import PostDetail from "./component/PostDetail";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<TestLoginPage />} />
          <Route path="/interestenter" element={<InterestEnter />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/calendarcomp" element={<CalendarComp />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/postlist" element={<PostList />} />
            <Route path="/postdetail" element={<PostDetail />} />
            <Route path="/postList" element={<PostList />} />
            {/* 선영 지도 */}
            <Route path="/KakaoMap" element={<KakaoMaps />} />
          </Route>
          <Route path="/MyPage" element={<MyPageEdit />} />
          <Route path="/postsubmit" element={<PostSubmit />} />
          {/* 선영 관리자페이지 */}
          {/* 관리자 메인 메뉴 페이지 */}
          <Route path="/AdminMain" element={<AdminMain />} />
          {/* 광고 관리 */}
          <Route path="/Advertising" element={<Advertising />} />
          {/* 전체 게시글 관리 */}
          <Route path="/AllBoardContent" element={<AllBoardContent />} />
          <Route
            path="/AdminBoardRegistration"
            element={<AdminBoardRegistration />}
          />
          {/* 전체 회원 관리 */}
          <Route path="/AllMemberInfo" element={<AllMemberInfo />} />
          <Route path="/AdminVisitorStatus" element={<AdminVisitorStatus />} />
          <Route path="/StockRatioByRegion" element={<StockRatioByRegion />} />
          <Route path="/SearchKeyword" element={<SearchKeyword />} />
          {/* 전체 결제 내역 관리 */}
          <Route path="/AllPaymentContent" element={<AllPaymentContent />} />
          <Route path="/AllPaymentList" element={<AllPaymentList />} />
          <Route path="/AllPaymentGraph" element={<AllPaymentGraph />} />
          {/* 문의하기(Q&A) */}
          <Route path="/AskContent" element={<AskContent />} />
          <Route path="/AdminChat" element={<AdminChat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
