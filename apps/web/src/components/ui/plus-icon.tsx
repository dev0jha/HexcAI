import React from "react";

interface PlusIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = ({
  size = 11,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.5 0L5.5 11M0 5.5L11 5.5" stroke={color} strokeWidth="1" />
    </svg>
  );
};
