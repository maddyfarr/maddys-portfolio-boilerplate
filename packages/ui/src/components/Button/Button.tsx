import './button.css';
import { colors, spacing, radii } from '../../theme';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  const style = {
    backgroundColor: primary ? colors.primary : colors.secondary,
    color: primary ? '#ffffff' : colors.text,
    padding: spacing.md,
    borderRadius: radii.md,
  }

  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={style}
      {...props}
    >
      {label}
    </button>
  );
};
