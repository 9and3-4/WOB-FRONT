import React from "react";
import styled from "styled-components";

const MapComponent = () => {

    return (
        <>
         {/* <MapContainer>
      <div className="lists">
          <b>내 주변 운동카테고리 목록</b>
      </div>
        <table className="list">
          <th>
            <tr>번호</tr>
            <tr>로고</tr>
            <tr>종목</tr>
            <tr>이미지</tr>
            <tr></tr>
          </th>
        </table>

        <BoardLists>
        {boardList && 
          boardList.map((data, index) => (
            <TableRow
            key={data.categoryId}
            onClick={() => handleRowClick(data.categoryId)}
            onMouseEnter={() => handleRowMouseEnter(index)}
            onMouseLeave={handleRowMouseLeave}
            isHovered={hoveredRow === index}
            active={data.active} // 추가된 부분: isActive props 전달
            className={data.active} // css에서 색 3가지 중 하나 선택해 색 바꿈
          >

            <ul className="data" key={index} >
              <li><p>{index + num}</p></li>
              <li><img src={data.logo} alt="로고" /></li>
              <li><p>{data.name}</p></li> 
              <li><img src={data.image} alt="이미지" /></li>
              <li><button>활성화/비활성화</button></li>
            </ul>
            </TableRow>
          ))}
        </BoardLists>

        <Buttons>
          <button onClick={() => handleClick("/AdminMain")}>메인으로가기</button>
        </Buttons>

    </MapContainer> */}
        </>
    );
};

export default MapComponent;