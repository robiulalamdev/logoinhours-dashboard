import MainLayout from "@/Layouts/MainLayout";
import store from "@/redux/store";
import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </Provider>
  );
}
