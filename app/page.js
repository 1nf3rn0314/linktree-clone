"use client"

import localFont from "next/font/local"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProductSansBold = localFont({
  src: "../app/fonts/ProductSans-Bold.ttf",
  variable: "--font-product-sans-bold",
  weight: "100 900",
});

export default function Home() {
  const [handle, setHandle] = useState("linktr.ee/");
  const router = useRouter();

  return (
    <main>
      <section className="grid grid-cols-2 main-page bg-[#254F1A] px-34 py-40 min-h-screen">
        <div className="text-flex flex flex-col gap-10 justify-center pl-4">
          <div className="text flex flex-col gap-4">
            <div className="heading text-[#d2e823] font-bold text-8xl">Everything you are. In one,<br />simple link in bio.</div>
            <div className="desc text-white text-xl">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</div>
          </div>
          <div className="getting-started flex gap-2">
            <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} className="text-[#757575] p-4 text-lg bg-white rounded-lg focus:outline-[#254F1A]"/>
            <button className={`claim-linktree bg-[#e9c0e9] text-[#1e2330] hover:cursor-pointer rounded-full px-7 py-4 text-lg ${ProductSansBold.className}`} onClick={() => router.push(`/create?handle=${handle.split('/')[1]}`)}>Claim your LinkTree</button>
          </div>
        </div>
        <Image src='/homepage-demo.png' width={800} height={180} alt="Homepage demo image" />
      </section>
      <section className="main-page bg-pink-300 py-12 px-34 min-h-screen">
        
      </section>
    </main>
  );
}
