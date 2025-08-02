import localFont from "next/font/local";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

const ProductSansBold = localFont({
  src: "../fonts/ProductSans-Bold.ttf",
  variable: "--font-product-sans-bold",
  weight: "100 900",
});

export default async function Page({ params }) {
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const handle = (await params).handle;
  const doc = await collection.findOne({ handle: handle });
  if (!doc) {
    return notFound();
  }

  return (
    <div className="flex flex-col bg-[#94d4ff] px-34 py-40 min-h-screen">
      <div className="content flex flex-col justify-center items-center gap-2">
        <img src={doc.piclink} width='100' height='auto' alt='Profile photo' className="rounded-full"/>
        <h1 className={`${ProductSansBold.className} text-3xl`}>@{doc.handle}</h1>
        <h2 className="text-xl text-slate-600 mb-8 max-w-[40%]">{doc.desc}</h2>
        {doc.links.map((linkitem, index) => {
          return <Link href={linkitem.link} className="link-item shadow-lg text-center w-1/3 py-3 px-5 text-lg" key={index}>
            {linkitem.linktext}
          </Link>
        })}
      </div>
    </div>
  );
}
