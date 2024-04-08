//
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';

type SelectOption = {
  value: string;
  label: string;
};

type MySelectDropdownProps = {
  value: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (selected: Option) => void;
};

export default function MySelectDropdown({
  value,
  placeholder,
  options,
  onChange,
}: MySelectDropdownProps) {
  return (
    <Dropdown
      options={options}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className='customDropDown'
    />
  );
}
