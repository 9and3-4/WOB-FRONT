import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserStore = (props) => {
  const [nickName, setNickName] = useState(
    localStorage.getItem("nickName") || "닉네임을 입력하세요."
  );

  useEffect(() => {
    localStorage.getItem("nickName", nickName);
  }, [nickName]);

  // 관리자 페이지에 사용하는 이름
  const [name, setName] = useState(
    localStorage.getItem("name") || "이름을 입력해주세요."
  );

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);


  return (
    <UserContext.Provider
      value={{
        nickName,
        setNickName,
        name,
        setName,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
