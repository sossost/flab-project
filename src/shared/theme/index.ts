export const theme = {
  colors: {
    primary: '#000000',
    secondary: '#666666',
    background: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    border: '#e0e0e0',
    error: '#ff0000',
    success: '#00ff00',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
} as const;

export type Theme = typeof theme;
