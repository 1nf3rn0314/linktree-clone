"use client"

import { useState } from "react"
import Link from "next/link"
import { ToastContainer, toast, Zoom } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useSearchParams } from "next/navigation"

const GenerateForm = () => {
  const searchParams = useSearchParams();
  const [handle, setHandle] = useState(searchParams.get('handle') || "");
  const [piclink, setPiclink] = useState("");
  const [linkobj, setLinkobj] = useState({ link: "", linktext: ""});
  const [linkarr, setLinkarr] = useState([]);
  const [desc, setDesc] = useState("");

  const addLink = () => {
    setLinkarr(linkarr.concat(linkobj));
    setLinkobj({ link: "", linktext: "" });
  }

  const addLinks = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        links: linkarr,
        handle: handle,
        piclink: piclink,
        desc: desc
      }),
      headers: headers,
      redirect: "follow"
    };

    const r = await fetch('/api/generate', requestOptions);
    const result = await r.json();
    if (r.status == 201) {
      toast.success(result.message, { position: "top-right", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, theme: "dark", transition: Zoom });
      setLinkarr([]);
      setLinkobj({ link: "", linktext: "" });
      setPiclink("");
      setHandle("");
      setDesc("");
    }
    else {
      toast.error(result.message, { position: "top-right", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: false, theme: "dark", transition: Zoom });;
    }
  }

  const deleteLinkItem = (index) => {
    linkarr.splice(index, 1);
    setLinkarr([...linkarr]);
    console.log(linkarr);
  }

  return (
    <div className="grid grid-cols-2 bg-[#e9c0e9] px-34 py-40 min-h-screen banner-div">
      <div className="left flex flex-col items-center gap-6 px-10">
        <h1 className="text-3xl">Create your LinkTree</h1>
        <div className="claim w-full flex flex-col gap-3">
          <h2 className="text-xl">Step 1: Claim your handle</h2>
          <div className="flex grow gap-2">
            <input type='text' className="create-link-inputs" placeholder="Your handle" value={handle} onChange={(e) => setHandle(e.target.value)}/>
          </div>
        </div>
        <div className="add-links w-full flex flex-col gap-3">
          <h2 className="text-xl">Step 2: Add links</h2>
          <div className="form flex flex-col justify-center items-end gap-2 w-full">
            <input type="text" className='create-link-inputs' placeholder="Link" value={linkobj.link} onChange={(e) => setLinkobj({ link: e.target.value, linktext: linkobj.linktext})}/>
            <input type="text" className='create-link-inputs' placeholder="Link text" value={linkobj.linktext} onChange={(e) => setLinkobj({ link: linkobj.link, linktext: e.target.value})}/>
            <button className="bg-black text-white py-1.5 px-7 rounded-full hover:cursor-pointer hover:invert" onClick={addLink}>Add link</button>
          </div>
        </div>
        <div className="add-pic w-full flex flex-col gap-3">
          <h2 className="text-xl">Step 3: Add picture, description and finalize</h2>
          <div className="form flex flex-col justify-center items-end gap-2 w-full">
            <input type="text" className='create-link-inputs' placeholder="Picture link" value={piclink} onChange={(e) => setPiclink(e.target.value)}/>
            <input type="text" className='create-link-inputs' placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}/>
          </div>
        </div>
        <div className="finalize w-[60%] flex flex-col gap-5">
          <button disabled={piclink === '' || handle === '' || desc === '' || linkarr.length == 0} className="bg-black text-white py-2.5 px-7 rounded-full hover:cursor-pointer hover:invert disabled:cursor-not-allowed disabled:invert" onClick={addLinks}>Generate</button>
        </div>
        <div className="link-items w-[75%] flex flex-col gap-2">
          {linkarr && linkarr.map((linkitem, index) => {
            return <div className='link-item w-full flex grow items-center justify-between p-2' key={index}>
              <Link href={linkitem.link} className="w-full px-3 text-lg">{linkitem.linktext}</Link>
              <button className="hover:bg-[#be90be] px-3 py-2 rounded-full hover:cursor-pointer" onClick={() => deleteLinkItem(index)}>X</button>
            </div>
          })}
        </div>
      </div>
      <div className="right h-screen">
        <img src='/generate-banner.webp' className="object-contain h-full"/>
      </div>
      <ToastContainer />
    </div>
  )
}

export default GenerateForm
