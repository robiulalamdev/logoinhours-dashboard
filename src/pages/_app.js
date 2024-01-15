import MainLayout from "@/Layouts/MainLayout";
import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}
