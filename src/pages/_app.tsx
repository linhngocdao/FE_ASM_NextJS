import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AppPropsWithLayout } from "../models/layout";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutWrapper = Component.Layout ?? Layout;
  return (
    <Provider store={store}>
    <LayoutWrapper>
      <Component {...pageProps} />
      <ToastContainer />
    </LayoutWrapper>
    </Provider>
  );
}

export default MyApp;
