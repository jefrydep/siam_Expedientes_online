import React from "react";
interface CustomProps {
  nameButton: string;
  color: string;
  textColor?: string;
  onClick?: () => void;
  width?: string;
}
const CustomButton = ({
  nameButton,
  textColor,
  color,
  onClick,
  width,
}: CustomProps) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`${color} ${textColor} loginButton shadow-md rounded-3xl px-3 py-2 w-auto ${
        !width && "w-full"
      }   ${width} `}
    >
      {nameButton}
    </button>
  );
};

export default CustomButton;
