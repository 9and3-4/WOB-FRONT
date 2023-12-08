import React from "react";
import styled from "styled-components";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";



const Main = () => {
    const handleClick = () => {
        alert('Button Clicked!');
      };

    const navigate = useNavigate();
    return(
        <>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Main Page with Button Component</h1>
      <Button label="Small Button" size="small" onClick={() => navigate('/calendarcomp')} />
      <Button label="Normal Button" size="normal" color='gray' onClick={handleClick} />
      <Button label="Large Button" size="large" onClick={handleClick} />
      <Button label="Extra Small Button" size="extra-small" onClick={handleClick} />
      <Button label="Extra Large Button" size="extra-large" onClick={handleClick} />
      <Button label="Custom Size Button" size={30} onClick={handleClick} />
      <Button label="null Button" onClick={handleClick} />
      <Button label="Disabled Button" disabled />
    </div>
        </>
    );
};

export default Main;