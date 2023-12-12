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


function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/calendarcomp" element={<CalendarComp />} />
            <Route path="/schedule" element={<Schedule />} />
            {/* 선영이 한것 */}
            <Route path="/KakaoMap" element={<KakaoMaps/>} />
          </Route>
          <Route path="/MyPage" element={<MyPageEdit />} />
          <Route path="/postsubmit" element={<PostSubmit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
