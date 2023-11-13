import '../styles/globals.css';
import { AppProps } from 'next/app';
import { Toaster } from "react-hot-toast";
import { Provider} from "react-redux";
import { store } from "../redux/store";
import Layout from '../components/layout';

const MyApp: React.FunctionComponent<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </Provider>
  )
}
export default MyApp
