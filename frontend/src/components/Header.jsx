import ButtonIcon from "./ButtonIcon";
import DropdownMenu from "./DropDownMenu";

const Header = () => (
  <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
    <ButtonIcon
      icon={<circle cx="12" cy="6" r="4" stroke="#ffffff" strokeWidth="1.5" />}
      size={25}
    />
    <span>New Chat App</span>
    <DropdownMenu />
  </div>
);

export default Header;
