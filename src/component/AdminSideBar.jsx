// import React from "react";
// import styled from "styled-components";
// import { Divide as Hamburger } from "hamburger-react";
// import { useState, useEffect } from "react";



// const AdminSideBar = () => {
//     const [isOpen, setOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const customer = window.localStorage.getItem("userRole"); // user , company, admin

//   useEffect(() => {
//     const handleResize = () => {
//       // 화면 너비가 768px 미만인 경우 isMobile을 true로 설정, 그렇지 않으면 false로 설정.
//       setIsMobile(window.innerWidth < 768);

//       // 화면 크기가 768px보다 커지면 isOpen을 false로 설정.
//       if (isOpen && window.innerWidth >= 768) {
//         setOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [isOpen]); // isOpen 상태가 변경될 때만 실행됩니다.
 
//     return (
//         <>
//         {isMobile ? (
//         <>
//           <Hamburger
//             color="#353535"
//             size={20}
//             toggled={isOpen}
//             toggle={setOpen}
//           />
//           {<Menu user={customer} open={isOpen} />}
//         </>
//       ) : (
//         <Menu user={customer} />
//       )}
//         </>
//     );
// };

// export default AdminSideBar;