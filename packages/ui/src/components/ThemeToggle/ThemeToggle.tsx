// packages/ui/src/components/ThemeToggle.tsx
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../Button/Button';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="primary" 
      onClick={toggleTheme} 
      label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`} 
    />
  );
};
