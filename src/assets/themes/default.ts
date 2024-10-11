const _accent_success_0 = '#008282';
const _shadows_default = '-5px 5px 5px';
const theme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    primary: '#2663e9',
    secondary: '#7368e0',
    success: '#43bf79',
    info: '#1db0d8',
    warning: '#eaad24',
    danger: '#ef5959',
    accent_white_0: '#ebf3fa',
    accent_white_1: '#acd3eb',
    accent_primary_0: '#1f4fc4',
    accent_secondary_0: '#5f4fc4',
    accent_success_0: _accent_success_0,
    accent_info_0: '#1686a4',
    accent_warning_0: '#d89c1e',
    accent_danger_0: '#d13f3f',
    transparency: {
      black: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
      white: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
    },
    text: {
      light: '#f5f5f5',
      gray: '#6491a3',
      dark: '#294551',
    }
  },
  spacing: {
    xxxs: {
      value: 0.25,
      get rem() {return `${this.value}rem`;},
      get em() {return `${this.value}em`;},
      get px() {return `${this.value * 16}px`;}
    },
    xxs: {
      value: 0.5,
      get rem() {return `${this.value}rem`;},
      get em() {return `${this.value}em`;},
      get px() {return `${this.value * 16}px`;}
    },
    xs: {
      value: 0.75,
      get rem() {return `${this.value}rem`;},
      get em() {return `${this.value}em`;},
      get px() {return `${this.value * 16}px`;}
    },
    s: {
      value: 1,
      get rem() {return `${this.value}rem`;},
      get em() {return `${this.value}em`;},
      get px() {return `${this.value * 16}px`;}
    },
    m: {
      value: 1.5,
      get rem() {return `${this.value}rem`;},
      get em() {return `${this.value}em`;},
      get px() {return `${this.value * 16}px`;}
    },
    l: {
      value: 2,
      get rem() {return `${this.value}rem`;},
      get em() {return `${this.value}em`;},
      get px() {return `${this.value * 16}px`;}
    },
    xl: {
      value: 3,
      get rem() {return `${this.value}rem`;},
      get em() {return `${this.value}em`;},
      get px() {return `${this.value * 16}px`;}
    },
    xxl: {
      value: 4,
      get rem() {return `${this.value}rem`;},
      get em() {return `${this.value}em`;},
      get px() {return `${this.value * 16}px`;}
    },
    xxxl: {
      value: 5,
      get rem() {return `${this.value}rem`;},
      get em() {return `${this.value}em`;},
      get px() {return `${this.value * 16}px`;}
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
    s: '375px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  shadows: {
    accent_default: (color: string) => `${_shadows_default} ${color}`,
    get default() {return this.accent_default(_accent_success_0+'2c');},
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