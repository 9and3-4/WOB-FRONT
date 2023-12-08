import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ color }) => color || 'var(--MINT)'};
  padding: ${({ size }) =>
    typeof size === 'number'
      ? `${size}px`
      : size === 'small'
      ? '5px 10px'
      : size === 'normal'
      ? '10px 15px'
      : size === 'large'
      ? '15px 20px'
      : size === 'extra-small'
      ? '3px 6px'
      : '10px 15px'};
  border-radius: 25px;
  border-color: ${({ color }) => color || 'var(--MINT)'};
  color: ${({ color }) => color || 'var(--BLACK)'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: 0;
  outline: 0;
`;

const Button = ({ label, onClick, color, size, disabled }) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      color={color}
      size={size}
    >
      {label}
    </StyledButton>
  );
};

Button.defaultProps = {
  onClick: () => {},
  color: null,
  size: null,
  disabled: false,
};

export default Button;
