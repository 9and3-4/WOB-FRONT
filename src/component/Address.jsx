import React, { useState } from "react";
import DaumPostApi from "../api/DaumPostApi";

const Address = () => {
  const [isAddr, setIsAddr] = useState(false);
  const [inputAddr, setInputAddr] = useState("");

  //주소 팝업
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const openPostCode = () => {
    setIsPopUpOpen(true);
  };
  const closePostCode = () => {
    setIsPopUpOpen(false);
  };

  const setAddr = (addr) => {
    setInputAddr(addr);
    setIsAddr(true);
  };

  return (
    <div className="inputArea">
      <label name="addr">
        <span>주소 검색</span>
        <input
          type="text"
          defaultValue={inputAddr}
          readOnly={true}
          onClick={openPostCode}
        />
        <button className="active" onClick={openPostCode}>
          찾기
        </button>
      </label>
      {isPopUpOpen && <DaumPostApi onClose={closePostCode} setAddr={setAddr} />}
    </div>
  );
};

export default Address;
