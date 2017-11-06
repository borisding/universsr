import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  className,
  name,
  id,
  value,
  placeholder,
  onBlur,
  onChange
}) => {
  return (
    <input
      type="text"
      className={className}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.any,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};

export default TextInput;
