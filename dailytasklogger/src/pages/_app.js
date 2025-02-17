import '../styles/globals.css';
import '../styles/index.module.css';
import '../styles/home.module.css';
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;