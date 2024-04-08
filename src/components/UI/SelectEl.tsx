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
  errorMessage?: string;
};

export default function MySelectDropdown({
  value,
  placeholder,
  options,
  onChange,
  errorMessage,
}: MySelectDropdownProps) {
  return (
    <>
      <Dropdown
        options={options}
        onChange={(selected: Option) => onChange(selected)}
        value={value}
        placeholder={placeholder}
        className='customDropDown'
      />
      {errorMessage && <span className='formError'>{errorMessage}</span>}
    </>
  );
}
