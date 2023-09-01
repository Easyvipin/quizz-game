import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <title>Spot the Fake Game</title>
      <Head>
        <meta
          name="description"
          content="Test your skills in spotting the fake items in this exciting game."
        />
        <link rel="icon" href="/banned.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
