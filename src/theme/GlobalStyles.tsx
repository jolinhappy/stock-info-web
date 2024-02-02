import { Global } from '@emotion/react';
import { css } from '@mui/material/styles';
import { withTheme } from '@mui/styles';

const globalStylesCss = () => css`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 100%;
  }

  body {
    margin: 0;
    padding: 0;

    background: transparent;

    font-family: "Roboto","Noto Sans JP","Noto Sans TC",Helvetica,Arial,sans-serif;
    font-weight: normal;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased; // sass-lint:disable-line no-vendor-prefixes
    -moz-osx-font-smoothing: grayscale; // sass-lint:disable-line no-vendor-prefixes
  }

  :focus {
    outline: none;
  }

  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  form,
  p,
  blockquote,
  th,
  td {
    margin: 0;
    padding: 0;
  }

  button, input, optgroup, select, textarea {
    font-family: inherit;
  }

  button {
    padding: 0;
    appearance: none;
    border: 0;
    border-radius: 0;
    background: transparent;
    line-height: 1;
    cursor: auto;
  }

  textarea {
    height: auto;
    min-height: 50px;
    border-radius: 0.3125rem;
  }

  a {
    line-height: inherit;
    text-decoration: none;
  }
`;

const GlobalStyles = withTheme(() => (
  <Global styles={() => globalStylesCss} />
));

export default GlobalStyles;
