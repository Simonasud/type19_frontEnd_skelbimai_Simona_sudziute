import { ThemeSwitcherProps } from '../../types/types';

function ThemeSwitcher({
  onLightThemeClick,
  onDarkThemeClick,
}: ThemeSwitcherProps) {
  return (
    <div className=''>
      <button className='themeIcon' onClick={onLightThemeClick}>
        <i className=' bi bi-brightness-high'></i>
      </button>
      <button className='themeIcon' onClick={onDarkThemeClick}>
        <i className=' bi bi-moon-stars-fill'></i>
      </button>
    </div>
  );
}

export default ThemeSwitcher;
