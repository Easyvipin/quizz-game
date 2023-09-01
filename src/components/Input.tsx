import React from "react";

interface IInputProps {
  label: string;
  placeholder: string;
  type: string;
  handleChange: (value: string) => void;
  error: string;
}

const Input: React.FunctionComponent<IInputProps> = ({
  label,
  placeholder,
  type,
  handleChange,
  error,
}) => {
  return (
    <div className="w-full m-1">
      <label className=" font-thin text-gray-300 text-sm block">{label}</label>
      <input
        className="outline-none border border-gray-300 rounded-lg p-2 text-gray-500 block w-full mt-1 placeholder:text-gray-400 "
        type={type}
        placeholder={placeholder}
        required
        onChange={(e) => handleChange(e.target.value)}
      />
      <span className="block text-xs text-orange-600 mt-[0.2rem] h-6 ">
        {error && error}
      </span>
    </div>
  );
};

export default Input;
