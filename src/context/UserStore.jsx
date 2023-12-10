import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [nickName, setNickName] = useState(
    localStorage.getItem("nickName") || "닉네임을 입력하세요."
  );
  useEffect(() => {
    localStorage.getItem("nickName", nickName);
  }, [nickName]);

  return (
    <UserContext.Provider
      value={{
        nickName,
        setNickName,
      }}
    ></UserContext.Provider>
  );
};

export default UserStore;
