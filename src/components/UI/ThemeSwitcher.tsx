// ThemeSwitcher.tsx
import { useTheme } from '../../store/ThemeProvider';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <div className={`theme-switcher ${theme}`}>
      <button className='themeIcon' onClick={handleThemeChange}>
        <i
          className={`bi bi-${
            theme === 'light' ? 'brightness-high' : 'moon-stars-fill'
          }`}
        ></i>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
