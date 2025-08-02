import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const doc = await collection.findOne({ handle: body.handle });
  if (doc) {
    return NextResponse.json({success: false, message: "Handle already claimed!"}, {status: 409});
  } else {
    await collection.insertOne(body);
    return NextResponse.json({success: true, message: "LinkTree generated!"}, {status: 201});
  }
}
