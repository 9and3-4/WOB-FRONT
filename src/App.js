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
import AskContent from "./page/admin/AskContent";
import TestLoginPage from "./page/Login";
import AdminBoardRegistration from "./page/admin/AdminBoardRegistration";
import AdminVisitorStatus from "./page/admin/AdminVisitorStatus";
import StockRatioByRegion from "./page/admin/StockRatioByRegion";
import SearchKeyword from "./page/admin/SearchKeyword";
import AllPaymentList from "./page/admin/AllPaymentList";
import InterestEnter from "./page/interestEnter";
import PostList from "./page/PostList";
import PostPreview from "./component/PostPreview";
import Setting from "./page/Setting/Setting";
import SettingLayout from "./layout/SettingLayout";
import Account from "./page/Setting/Account";
import PaymentDatails from "./page/Setting/PaymentDetails";
import Policy from "./page/Setting/Policy";
import Questions from "./page/Setting/Questions";
import PasswordChange from "./page/Setting/PasswordChange";
import Withdrawal from "./page/Setting/Withdrawal";
import AskContents from "./page/admin/AskContents";
import SignIn from "./page/login/SignIn";
import SignUp from "./page/login/SignUp";
import Address from "./component/Address";
import Chatting from "./page/Chatting/Chatting";
import CompletePayment from "./page/Payment/CompletePayment";
import Payment from "./component/Payment";
import PostDetail from "./page/PostDetail";
import FreeChat from "./page/Chatting/FreeChat";
import ChatCreate from "./page/Chatting/ChatCreate";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<TestLoginPage />} />
          <Route path="/interestenter" element={<InterestEnter />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/calendarcomp" element={<CalendarComp />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/postlist" element={<PostList />} />
            <Route path="/postpreview" element={<PostPreview />} />
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
          <Route path="/AllPaymentList" element={<AllPaymentList />} />
          {/* 문의하기(Q&A) */}
          <Route path="/AskContent" element={<AskContent />} />
          {/* <Route path="/AskContents" element={<AskContents />} /> */}
          {/* 환경설정 */}
          <Route element={<SettingLayout />}>
            <Route path="/Setting" element={<Setting />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/PaymentDetails" element={<PaymentDatails />} />
            <Route path="/Policy" element={<Policy />} />
            <Route path="/Questions" element={<Questions />} />
            <Route path="/PasswordChange" element={<PasswordChange />} />
            <Route path="/Withdrawal" element={<Withdrawal />} />
            <Route path="/FreeChat" element={<FreeChat />} />
            <Route path="/ChatCreate" element={<ChatCreate />} />

            {/* 주소Api */}
            <Route path="/Address" element={<Address />} />
          </Route>
          <Route path="/Chatting/:roomId" element={<Chatting />} />
          <Route
            path="/CompletePayment/:paymentId"
            element={<CompletePayment />}
          />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/postdetail/:postId" element={<PostDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
