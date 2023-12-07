import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from "./page/schedule/Schedule";
import CalendarComp from "./component/CalendarComp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/weekly" element={<CalendarComp />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
