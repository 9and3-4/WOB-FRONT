import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick, color, size, disabled }) => {
    const defaultBack = 'var(--MINT)';
    const defaultLetter = 'var(--BLACK)';

    const paddingValue = 
    typeof size === 'number' ? `${size}px` :
    size === 'small' ? '5px 10px' :
    size === 'normal' ? '10px 15px' :
    size === 'large' ? '15px 20px' :
    size === 'extra-small' ? '3px 6px' :
    '10px 15px'; // 기본값

  const buttonStyle = {
    backgroundColor: color || defaultBack,
    padding: paddingValue,
    borderRadius: '25px',
    borderColor: 'var(--MINT)',
    color: color || defaultLetter,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,   // 비활성버튼 투명해짐 - 요소의 투명도, 0은 완전한 투명(요소 안보임), 1은 완전한 불투명 
  };


  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'normal', 'large', 'extra-small', 'extra-large']),
    PropTypes.number, // 숫자도 허용
  ]),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  color: null,
  size: null,
  disabled: false,
};

export default Button;
