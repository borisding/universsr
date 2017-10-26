import React from 'react';

const Checkbox = ({
  className = null,
  name = null,
  id = null,
  value = '',
  isChecked = false,
  onChange = null,
  onClick = null
}) => {
  return (
    <input
      type="checkbox"
      className={className}
      name={name}
      id={id}
      value={value}
      checked={isChecked}
      onClick={onClick}
      onChange={onChange}
    />
  );
};

export default Checkbox;
