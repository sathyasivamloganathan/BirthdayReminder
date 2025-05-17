import React from 'react'

const Form = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  labelClassName,
  inputClassName,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={`mb-1 font-normal ${labelClassName}`}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`${inputClassName}`}
      />
    </div>
  );
};

export default Form
