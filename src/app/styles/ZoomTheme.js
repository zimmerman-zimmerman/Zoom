import { css } from 'styled-components';

const isObject = item =>
  item && typeof item === 'object' && !Array.isArray(item);

const deepFreeze = obj => {
  Object.keys(obj).forEach(
    key => key && isObject(obj[key]) && Object.freeze(obj[key]),
  );
  return Object.freeze(obj);
};

export const ZoomTheme = deepFreeze({
  global: {
    colors: {
      background: '#ffffff',
      brand: '#000000',
      control: '#ED6F00',
      focus: '#001b30',
      'aidfonds-red': '#ff0100',
      'aidfonds-blue': '#0000ff',
    },
    font: {
      family: 'FFMarkProAF-Book, "Helvetica Neue", Helvetica, sans-serif',
      face: undefined,
    },
  },
  anchor: {
    color: '#000000',
  },
  button: {
    extend: css`
      ${props =>
        !props.plain &&
        `
        font-weight: 600;
        border-radius: 4px;
      `}
    `,
  },
  checkBox: {
    size: '20px',
    extend: css`
      > div {
        > div {
          background: #ffffff;
        }
      }
    `,
    icon: {
      extend: css`
        box-sizing: border-box;
        position: absolute;
        top: 0px;
        left: 0px;
        background: #ffffff;
        width: ${props => props.theme.checkBox.size};
        height: ${props => props.theme.checkBox.size};
      `,
    },
  },
  select: {
    control: {
      extend: css`
        border-color: #d1d1d1;
      `,
    },
  },
  formField: {
    border: {
      color: '#9b9b9b',
      position: 'inner',
      side: 'bottom',
      error: {
        color: {
          dark: 'white',
          light: 'status-critical',
        },
      },
    },
    label: {
      color: '#9b9b9b',
      size: '15px',
    },
  },
  textInput: {
    extend: css`
      font-weight: 400;
    `,
  },
});
