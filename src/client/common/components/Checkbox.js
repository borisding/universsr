import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  className,
  name,
  id,
  value,
  isChecked,
  onChange,
  onClick
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

Checkbox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

export default Checkbox;
