import { useState } from "react";
import ButtonIcon from "./ButtonIcon";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <ButtonIcon
        onClick={() => setOpen(!open)}
        icon={
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.1395 12.0002C14.1395 13.1048 13.2664 14.0002 12.1895 14.0002C11.1125 14.0002 10.2395 13.1048 10.2395 12.0002C10.2395 10.8957 11.1125 10.0002 12.1895 10.0002C13.2664 10.0002 14.1395 10.8957 14.1395 12.0002Z"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        }
        size={30}
      />
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
          >
            {/* Add SVG Icons Here */}
            Appearance
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
          >
            Favorite
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
          >
            More
          </a>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
