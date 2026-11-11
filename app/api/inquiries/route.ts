import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
const allowed = new Set(["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","text/plain","image/jpeg","image/png"]);
const clean=(v:FormDataEntryValue|null,max=5000)=>typeof v==="string"?v.trim().slice(0,max):"";

export async function POST(req:NextRequest){
 try{
  const form=await req.formData();
  const name=clean(form.get("name"),100),email=clean(form.get("email"),150),phone=clean(form.get("phone"),30),service=clean(form.get("service"),120),title=clean(form.get("title"),180),details=clean(form.get("details"),5000);
  if(!name||!email||!phone||!service||!title||details.length<15||form.get("consent")!=="yes") return NextResponse.json({error:"Please complete all required fields and confirm consent."},{status:400});
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({error:"Enter a valid email address."},{status:400});
  const files=form.getAll("attachment").filter((f):f is File=>f instanceof File&&f.size>0);
  if(files.length>5) return NextResponse.json({error:"You can attach up to 5 files."},{status:400});
  for(const f of files){if(f.size>8*1024*1024||!allowed.has(f.type))return NextResponse.json({error:"One or more files are too large or have an unsupported format."},{status:400});}
  const db=supabaseAdmin();
  const ref="NEX-"+new Date().getFullYear()+"-"+crypto.randomUUID().slice(0,8).toUpperCase();
  const {data:row,error:insertError}=await db.from("inquiries").insert({
   reference:ref,name,email,phone,service,title,level:clean(form.get("level"),80),word_count:clean(form.get("word_count"),80),
   reference_style:clean(form.get("reference_style"),80),deadline:clean(form.get("deadline"),20)||null,budget:clean(form.get("budget"),80),
   details,status:"New inquiry"
  }).select("id").single();
  if(insertError) throw insertError;
  const uploaded:string[]=[];
  for(const file of files){
   const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,"_").slice(0,100);
   const path=`${row.id}/${crypto.randomUUID()}-${safe}`;
   const {error}=await db.storage.from("inquiry-files").upload(path,Buffer.from(await file.arrayBuffer()),{contentType:file.type,upsert:false});
   if(error) throw error;
   uploaded.push(path);
  }
  if(uploaded.length){const {error}=await db.from("inquiries").update({file_paths:uploaded}).eq("id",row.id);if(error)throw error;}
  await sendNotification({ref,name,email,phone,service,title,details});
  return NextResponse.json({ok:true,reference:ref});
 }catch(e){
  console.error("Inquiry submission error:",e);
  return NextResponse.json({error:"We could not submit your request right now. Please try again or contact us through WhatsApp."},{status:500});
 }
}
async function sendNotification(d:{ref:string;name:string;email:string;phone:string;service:string;title:string;details:string}){
 const key=process.env.RESEND_API_KEY;if(!key)return;
 const to=process.env.BUSINESS_NOTIFICATION_EMAIL;if(!to)return;
 await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({
  from:process.env.NOTIFICATION_FROM_EMAIL||"Nexwin Logistics <onboarding@resend.dev>",to:[to],
  subject:`New Nexwin inquiry: ${d.ref}`,
  html:`<h2>New inquiry received</h2><p><b>Reference:</b> ${d.ref}</p><p><b>Name:</b> ${esc(d.name)}</p><p><b>Email:</b> ${esc(d.email)}</p><p><b>Phone:</b> ${esc(d.phone)}</p><p><b>Service:</b> ${esc(d.service)}</p><p><b>Title:</b> ${esc(d.title)}</p><p>${esc(d.details)}</p>`
 })});
}
function esc(s:string){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]!));}
