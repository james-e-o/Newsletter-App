import { Inter } from "next/font/google";
import "./globals.css"
import Header from "./header";

export const metadata = {
  title: "NewsletterApp",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body className={` w-screen h-screen`}>
      {/* <Header/> */}
        {children}
        </body>
    </html>
  );
}
