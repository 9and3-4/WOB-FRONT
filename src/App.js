import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from "./page/schedule/Schedule";
import CalendarComp from "./component/CalendarComp";
import GlobalStyle from "./globalStyle";
import Main from "./page/Main";
import Layout from "./layout/Layout";
import KakaoMaps from "./page/map/Maps";



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
            <Route path="/KakaoMap" element={<KakaoMaps />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
