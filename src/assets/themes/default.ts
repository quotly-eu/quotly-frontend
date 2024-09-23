const _accent_success_0 = '#008282';
const _shadows_default = '-5px 5px 5px';
const theme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    primary: '#2663e9',
    secondary: '#7368e0',
    success: '#43bf79',
    danger: '#ef5959',
    warning: '#eaad24',
    info: '#1db0d8',
    accent_white_0: '#ebf3fa',
    accent_white_1: '#acd3eb',
    accent_primary_0: '#1f4fc4',
    accent_secondary_0: '#5f4fc4',
    accent_success_0: _accent_success_0,
    transparency: {
      black: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
      white: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
    },
    text: {
      dark: '#294551',
      gray: '#6491a3',
      light: '#f5f5f5',
    }
  },
  spacing: {
    xxxs: {
      rem: '0.25rem',
      em: '0.25em',
      px: '4px',
    },
    xxs: {
      rem: '0.5rem',
      em: '0.5em',
      px: '8px',
    },
    xs: {
      rem: '0.75rem',
      em: '0.75em',
      px: '12px',
    },
    s: {
      rem: '1rem',
      em: '1em',
      px: '16px',
    },
    m: {
      rem: '1.5rem',
      em: '1.5em',
      px: '24px',
    },
    l: {
      rem: '2rem',
      em: '2em',
      px: '32px',
    },
    xl: {
      rem: '3rem',
      em: '3em',
      px: '48px',
    },
    xxl: {
      rem: '4rem',
      em: '4em',
      px: '64px',
    },
    xxxl: {
      rem: '5rem',
      em: '5em',
      px: '80px',
    },
  },
  font: {
    sizes: {
      xxxs: '0.75rem',
      xxs: '1rem',
      xs: '1.125rem',
      ss: '1.25rem',
      s: '1.5rem',
      m: '2rem',
      l: '3rem',
      xl: '4rem',
      xxl: '5rem',
      xxxl: '6rem',
    },
    family: {
      default: '"Nunito", Arial, sans-serif',
    },
  },
  breakpoints: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  shadows: {
    default: `${_shadows_default} ${_accent_success_0}2c`,
    accent_default: (color: string) => `${_shadows_default} ${color}`,
  },
  transition: {
    times: {
      s: '150ms',
      m: '250ms',
      l: '500ms'
    }
  }
};
export default theme; // Light theme