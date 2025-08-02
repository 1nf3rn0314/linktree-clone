"use client"

import Image from "next/image"
import localFont from "next/font/local"
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProductSansBold = localFont({
  src: "../app/fonts/ProductSans-Bold.ttf",
  variable: "--font-product-sans-bold",
  weight: "100 900",
});

const Navbar = () => {
  const pathname = usePathname();
  const showNavbar = ['/', '/create'].includes(pathname)
  
  return (showNavbar &&
    <nav className='bg-white flex justify-between items-center pl-11 pr-3 py-3 text-[#232323] rounded-full fixed top-12 left-34 right-34'>
      <div className="left flex items-center justify-center gap-10">
        <Link href='/'><Image src='logo.svg' width={120} height={10} alt='Logo' /></Link>
        <div className="links flex">
          <button className="navbar-link">Products</button>
          <button className="navbar-link">Templates</button>
          <button className="navbar-link">Marketplace</button>
          <button className="navbar-link">Learn</button>
          <button className="navbar-link">Pricing</button>
        </div>
      </div>
      <div className="right flex items-center justify-center gap-2">
        <button className={`log-in bg-[#eff0ec] hover:bg-[#e9e9e9] hover:cursor-pointer rounded-lg px-7 py-4 text-lg ${ProductSansBold.className}`}>Log in</button>
        <button className={`sign-up bg-black text-white hover:bg-[#262d3e] hover:cursor-pointer rounded-full px-7 py-4 text-lg ${ProductSansBold.className}`}>Sign up free</button>
      </div>
    </nav>
  )
}

export default Navbar
