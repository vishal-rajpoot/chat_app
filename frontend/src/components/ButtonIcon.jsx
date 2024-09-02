/* eslint-disable react/prop-types */
const ButtonIcon = ({ onClick, icon, size = 25, className = "" }) => (
  <button
    onClick={onClick}
    className={`hover:bg-blue-400 rounded-md p-1 ${className}`}
  >
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icon}
    </svg>
  </button>
);

export default ButtonIcon;
