import React from "react";
interface CustomProps {
  nameButton: string;
  color: string;
  onClick?: () => void;
}
const CustomButton = ({ nameButton, color, onClick }: CustomProps) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`${color} loginButton shadow-md rounded-3xl px-2 py-2 z-30  w-full`}
    >
      {nameButton}
    </button>
  );
};

export default CustomButton;
