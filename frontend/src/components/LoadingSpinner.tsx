import React from "react";

interface LoadingSpinnerProps {
  size?: string; // e.g., "w-8 h-8"
  color?: string; // Tailwind color class, default: "text-blue-600"
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "w-8 h-8", color = "text-blue-600" }) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-4 border-t-4 border-gray-200 ${size} ${color}`}></div>
    </div>
  );
};

export default LoadingSpinner;
