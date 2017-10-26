import React from 'react';

const TextInput = ({
  className = null,
  name = null,
  id = null,
  value = '',
  placeholder = null,
  onBlur = null,
  onChange = null
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

export default TextInput;
