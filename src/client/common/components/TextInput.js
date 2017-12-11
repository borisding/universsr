import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  autoFocus,
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
      autoFocus={autoFocus}
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
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};

export default TextInput;
