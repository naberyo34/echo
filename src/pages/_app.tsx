import { Global, css } from '@emotion/react';
import type { AppProps } from 'next/app';
// @ts-ignore
import cssReset from 'modern-css-reset/dist/reset.min.css';

const globalStyles = css`
  ${cssReset}
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&family=Roboto:wght@400;900&display=swap');

  body {
    min-height: auto;
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
    text-decoration: none;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
