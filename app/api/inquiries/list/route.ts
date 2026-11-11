import { NextRequest,NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
export async function GET(req:NextRequest){
 const token=req.headers.get("authorization")?.replace(/^Bearer\s+/i,"");
 if(!token||!process.env.ADMIN_EMAIL)return NextResponse.json({error:"Unauthorized"},{status:401});
 const {data:userData,error:authError}=await supabaseAdmin().auth.getUser(token);
 if(authError||userData.user?.email?.toLowerCase()!==process.env.ADMIN_EMAIL.toLowerCase())return NextResponse.json({error:"Unauthorized"},{status:401});
 const {data,error}=await supabaseAdmin().from("inquiries").select("id,reference,name,email,phone,service,title,status,created_at,deadline,budget").order("created_at",{ascending:false}).limit(500);
 if(error)return NextResponse.json({error:"Could not load inquiries."},{status:500});
 return NextResponse.json({inquiries:data||[]});
}