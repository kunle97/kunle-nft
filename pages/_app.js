// import "../styles/globals.css";
import "../styles/content_blocks_modernstyle.css";
import "../styles/Footer-Dark-Multi-Column.css";
import "../styles/Header-Blue--Sticky-Header--Smooth-Scroll.css";
import "../styles/Social-Icon--hover-effect.css";
import "../styles/styles.css";
import "../styles/Timeline.css";
import Head from "next/head";
import Landing from "../components/Landing";
import { MoralisProvider } from "react-moralis";
// import "../public/jquery/jquery-3.6.0.slim.min.js"
// import "../public/bootstrap/js/bootstrap.min.js"
// import "../public/bootstrap/js/bootstrap.bundle.min.js"
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      appId={process.env.NEXT_PUBLIC_APP_ID}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <script src=""></script>
        <script src=""></script>
      </Head>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
