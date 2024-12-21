import React from 'react';
import PropTypes from 'prop-types';


const Input = ({ className, type, placeholder, name, value, onChange }) => {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string, 
  type: PropTypes.string,
  placeholder: PropTypes.string, 
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string
};


export default Input;
