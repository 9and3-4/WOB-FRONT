import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from "./page/schedule/Schedule";
import CalendarComp from "./component/CalendarComp";
import Header from "./layout/Header";
import GlobalStyle from "./globalStyle";
import KakaoMap from "./component/Map";
import SearchComponent from "./component/SearchFilter";

function App() {
  return (
    <>
    <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<Header />} >
            <Route path="/" element={<CalendarComp />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/map" element={<KakaoMap />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
