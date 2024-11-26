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
     
      <body className={`w-screen overflow-hidden h-[100svh]`}>
      {/* <Header/> */}
        {children}
      </body>
    </html>
  );
}
