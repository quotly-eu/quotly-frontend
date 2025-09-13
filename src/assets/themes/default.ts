const light = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    primary: '#2663e9',
    secondary: '#7368e0',
    success: '#43bf79',
    info: '#1db0d8',
    warning: '#eaad24',
    danger: '#ef5959',
    gold: '#f0b90b',
    silver: '#c0c0c0',
    bronze: '#cd7f32',
    accent_white_0: '#ebf3fa',
    accent_white_1: '#acd3eb',
    accent_primary_0: '#1f4fc4',
    accent_secondary_0: '#5f4fc4',
    accent_success_0: '#008282',
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
  shadows: {
    accent_default: (color: string) => `-5px 5px 5px ${color}`,
    get default() {return this.accent_default(light.colors.accent_success_0+'2c');},
  }
};

const dark = {
  colors: {
    white: '#121212',
    black: '#ffffff',
    primary: '#4c8aff',
    secondary: '#a191ff',
    success: '#28c76f',
    info: '#00bcd4',
    warning: '#ffb400',
    danger: '#ff3b30',
    gold: '#ffcc00',
    silver: '#b0b0b0',
    bronze: '#b5691d',
    accent_white_0: '#2b3442',
    accent_white_1: '#212c40',
    accent_primary_0: '#3f6ad8',
    accent_secondary_0: '#8c6eff',
    accent_success_0: '#419a9a',
    accent_info_0: '#0085a3',
    accent_warning_0: '#c48200',
    accent_danger_0: '#b02a2a',
    transparency: {
      black: (opacity: number) => `rgba(200, 200, 200, ${opacity})`,
      white: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
    },
    text: {
      light: '#ffffff',
      gray: '#a5b9c5',
      dark: '#fdfdfd',
    }
  },
  shadows: {
    accent_default: (color: string) => `-5px 5px 7px ${color}`,
    get default() {return this.accent_default(dark.colors.accent_success_0+'20');},
  }
};

const theme = {
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
      xxxs: {
        value: 0.75,
        get rem() {return `${this.value}rem`;},
        get em() {return `${this.value}em`;},
        get px() {return `${this.value * 16}px`;}
      },
      xxs: {
        value: 1,
        get rem() {return `${this.value}rem`;},
        get em() {return `${this.value}em`;},
        get px() {return `${this.value * 16}px`;},
      },
      xs: {
        value: 1.125,
        get rem() {return `${this.value}rem`;},
        get em() {return `${this.value}em`;},
        get px() {return `${this.value * 16}px`;},
      },
      ss: {
        value: 1.25,
        get rem() {return `${this.value}rem`;},
        get em() {return `${this.value}em`;},
        get px() {return `${this.value * 16}px`;},
      },
      s: {
        value: 1.5,
        get rem() {return `${this.value}rem`;},
        get em() {return `${this.value}em`;},
        get px() {return `${this.value * 16}px`;},
      },
      m: {
        value: 2,
        get rem() {return `${this.value}rem`;},
        get em() {return `${this.value}em`;},
        get px() {return `${this.value * 16}px`;},
      },
      l: {
        value: 3,
        get rem() {return `${this.value}rem`;},
        get em() {return `${this.value}em`;},
        get px() {return `${this.value * 16}px`;},
      },
      xl: {
        value: 4,
        get rem() {return `${this.value}rem`;},
        get em() {return `${this.value}em`;},
        get px() {return `${this.value * 16}px`;},
      },
      xxl: {
        value: 5,
        get rem() {return `${this.value}rem`;},
        get em() {return `${this.value}em`;},
        get px() {return `${this.value * 16}px`;},
      },
      xxxl: {
        value: 6,
        get rem() {return `${this.value}rem`;},
        get em() {return `${this.value}em`;},
        get px() {return `${this.value * 16}px`;}
      }
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
  transition: {
    times: {
      s: '150ms',
      m: '250ms',
      l: '500ms'
    }
  }
};

export const themes = {
  light: {
    ...light,
    ...theme,
  },
  dark: {
    ...dark,
    ...theme
  }
};

export const darkTheme = {
  ...dark,
  ...theme,
};

export default {
  ...light,
  ...theme
};