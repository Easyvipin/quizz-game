import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "success";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const baseClasses =
    "border-2 px-4 py-2 rounded-lg focus:outline-none hover:cursor-pointer";

  const variantClasses = {
    primary: "border-violet-500 hover:bg-violet-500",
    ghost: "border-gray-500 hover:bg-gray-500 hover:text-white",
    success: "text-gray-100 bg-green-600 hover:bg-green-700 border-green-500",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${
    className || ""
  }`;

  return (
    <button className={combinedClasses} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
