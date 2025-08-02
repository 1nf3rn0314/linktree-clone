import Navbar from "@/components/Navbar";
import "./globals.css";
import localFont from "next/font/local"

const ProductSans = localFont({
  src: "./fonts/ProductSans-Regular.ttf",
  variable: "--font-product-sans",
  weight: "100 900",
});

export const metadata = {
  title: "LinkTree Clone",
  description: "LinkTree Clone using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ProductSans.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
