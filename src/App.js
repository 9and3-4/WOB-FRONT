import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from "./page/schedule/Schedule";
import CalendarComp from "./component/CalendarComp";
import Header from "./layout/Header";
import GlobalStyle from "./globalStyle";

function App() {
  return (
    <>
    <GlobalStyle />
      <Router>
        <Routes>
          {/* <Route path="/weekly" element={<CalendarComp />} />
          <Route path="/schedule" element={<Schedule />} /> */}
          <Route path="/header" element={<Header />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
