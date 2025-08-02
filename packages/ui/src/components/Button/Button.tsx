import './button.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  variant = 'secondary',
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = `storybook-button--${variant}`;
  
  const className = [
    'storybook-button',
    `storybook-button--${size}`,
    mode
  ].join(' ');

  const style = backgroundColor ? { backgroundColor } : {};

  return (
    <button
      type="button"
      className={className}
      style={style}
      {...props}
    >
      {label}
    </button>
  );
};
