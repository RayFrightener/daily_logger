/*This file allows you to augment the <html> 
and <body> tags that are used on all of your pages.
There are two special non-standard kind of icons for Safari browser: apple-touch-icon for iOS devices and mask-icon for pinned tabs on macOS. apple-touch-icon is applied only when the user adds a site to home screen: you can specify multiple icons with different sizes for different devices. mask-icon will only be used if the user pins the tab in desktop Safari: the icon itself should be a monochrome SVG, and the color attribute fills the icon with needed color.*/

import Document, { Html, Head, Main, NextScript } from 'next/document';

class myDocument extends Document {
  render():JSX.Element {
    return (
      <Html lang="en-US">
        <Head>
        {//always include character set, title, and viewport settings in your head element.
        }
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1" />
     {/*<link rel="icon" sizes="16x16 32x32 48x48" type="image/png" href="/images/mlwicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/mlwicon.png" />
        <link rel="mask-icon" href="/images/mlwicon.svg" color="#226DAA" /> 
        */}
        <title>The Daily Task Logger</title>
        </Head >
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default myDocument;