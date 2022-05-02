import { Global, css } from '@emotion/react';
import type { AppProps } from 'next/app';
// @ts-ignore
import cssReset from 'modern-css-reset/dist/reset.min.css';

const globalStyles = css`
  ${cssReset}

  body {
    min-height: auto;
    color: #fff;
    background: #202124;
  }

  * {
    padding: 0;
    margin: 0;
    line-height: 1;
  }

  li {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input {
    color: inherit;
    background-color: inherit;
    border: none;
    appearance: none;
  }
`;

const wrapperStyles = css`
  padding: 40px;
`;

const MyApp = ({ Component, pageProps }: AppProps) => (
  <section css={wrapperStyles}>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </section>
);

export default MyApp;
