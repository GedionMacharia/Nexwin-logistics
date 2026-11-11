import { NextRequest,NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
async function authorized(req:NextRequest){
 const token=req.headers.get("authorization")?.replace(/^Bearer\s+/i,"");
 if(!token||!process.env.ADMIN_EMAIL)return false;
 const {data,error}=await supabaseAdmin().auth.getUser(token);
 return !error && data.user?.email?.toLowerCase()===process.env.ADMIN_EMAIL.toLowerCase();
}
export async function PATCH(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 if(!(await authorized(req)))return NextResponse.json({error:"Unauthorized"},{status:401});
 const {id}=await params;const body=await req.json();
 const allowed=["New inquiry","Reviewing","Quotation sent","Awaiting client response","In progress","Completed","Cancelled"];
 if(!allowed.includes(body.status))return NextResponse.json({error:"Invalid status"},{status:400});
 const {error}=await supabaseAdmin().from("inquiries").update({status:body.status,admin_notes:String(body.admin_notes||"").slice(0,3000)}).eq("id",id);
 if(error)return NextResponse.json({error:"Could not update inquiry."},{status:500});
 return NextResponse.json({ok:true});
}
export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 if(!(await authorized(req)))return NextResponse.json({error:"Unauthorized"},{status:401});
 const {id}=await params;const db=supabaseAdmin();
 const {data,error}=await db.from("inquiries").select("*").eq("id",id).single();
 if(error||!data)return NextResponse.json({error:"Inquiry not found."},{status:404});
 const signed=[];
 for(const path of (data.file_paths||[])){const {data:s}=await db.storage.from("inquiry-files").createSignedUrl(path,300);if(s?.signedUrl)signed.push({path,url:s.signedUrl});}
 return NextResponse.json({inquiry:{...data,files:signed}});
}