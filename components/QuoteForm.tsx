'use client';
import { useEffect, useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
const serviceOptions=["Academic learning support","Essay planning & feedback","Research assistance","Literature review support","Editing & proofreading","Dissertation & thesis editing","Case study learning support","Business writing","Articles & blog content","Technical writing","Reports & document formatting","PowerPoint presentations","Referencing & citation formatting","CVs & cover letters","Document & PDF services","Other"];
export default function QuoteForm(){
 const [busy,setBusy]=useState(false),[result,setResult]=useState(""),[error,setError]=useState(""),[selectedService,setSelectedService]=useState("");
 useEffect(()=>{const value=new URLSearchParams(window.location.search).get("service");if(value)setSelectedService(value);},[]);
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setBusy(true);setError("");setResult("");
  const form=e.currentTarget;const data=new FormData(form);
  try{const res=await fetch("/api/inquiries",{method:"POST",body:data});const json=await res.json();if(!res.ok)throw new Error(json.error||"We could not submit your request. Please try again.");setResult(json.reference);form.reset();}
  catch(err){setError(err instanceof Error?err.message:"Something went wrong.");}
  finally{setBusy(false);}
 }
 return <form onSubmit={submit} className="form-grid">
  <div className="field"><label htmlFor="name">Full name *</label><input id="name" name="name" required maxLength={100} placeholder="Your full name"/></div>
  <div className="field"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" required maxLength={150} placeholder="you@example.com"/></div>
  <div className="field"><label htmlFor="phone">WhatsApp / phone number *</label><input id="phone" name="phone" required maxLength={30} placeholder="+254..."/></div>
  <div className="field"><label htmlFor="service">Service required *</label><select id="service" name="service" required value={selectedService} onChange={e=>setSelectedService(e.target.value)}><option value="" disabled>Select a service</option>{serviceOptions.map(x=><option key={x}>{x}</option>)}</select></div>
  <div className="field full"><label htmlFor="title">Project title / topic *</label><input id="title" name="title" required maxLength={180} placeholder="Briefly describe your project"/></div>
  <div className="field"><label htmlFor="level">Level / context</label><select id="level" name="level" defaultValue=""><option value="">Select if applicable</option><option>High school</option><option>College</option><option>Undergraduate</option><option>Postgraduate</option><option>Professional / business</option><option>Other</option></select></div>
  <div className="field"><label htmlFor="words">Word count / scope</label><input id="words" name="word_count" maxLength={80} placeholder="e.g. 1,500 words / 10 slides"/></div>
  <div className="field"><label htmlFor="reference">Referencing style</label><select id="reference" name="reference_style" defaultValue=""><option value="">Not applicable</option><option>APA 7</option><option>MLA</option><option>Harvard</option><option>Chicago</option><option>Other / not sure</option></select></div>
  <div className="field"><label htmlFor="deadline">Required deadline</label><input id="deadline" name="deadline" type="date" min={new Date().toISOString().slice(0,10)}/></div>
  <div className="field"><label htmlFor="budget">Estimated budget (optional)</label><input id="budget" name="budget" maxLength={80} placeholder="Your preferred budget"/></div>
  <div className="field full"><label htmlFor="details">Project instructions / details *</label><textarea id="details" name="details" required minLength={15} maxLength={5000} placeholder="Describe what you need, any specific requirements, and the outcome you are looking for..."/></div>
  <div className="field full"><label htmlFor="attachment">Attach instructions or reference files (optional)</label><input id="attachment" name="attachment" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png" multiple/><small style={{color:"#7b8799",fontSize:11}}>Maximum 5 files, 8 MB each. Accepted: PDF, DOC, DOCX, PPT, PPTX, TXT, JPG and PNG.</small></div>
  <div className="field full"><label style={{display:"flex",gap:9,alignItems:"flex-start",fontWeight:500}}><input type="checkbox" name="consent" value="yes" required style={{width:15,marginTop:2}}/> I agree that Nexwin Logistics may contact me about this inquiry and handle the information I submit according to its privacy policy.</label></div>
  <div className="field full"><div className="notice">Please do not upload passwords, payment card details, government ID numbers or unrelated sensitive information. Academic support is limited to guidance, editing, research support and feedback.</div></div>
  {error&&<div className="field full"><div className="error">{error}</div></div>}
  {result&&<div className="field full"><div className="success"><CheckCircle2 size={18} style={{display:"inline",verticalAlign:"middle",marginRight:7}}/>Your request has been received. Your reference number is <strong>{result}</strong>. Please keep it for future communication.</div></div>}
  <div className="field full"><button className="btn btn-gold" disabled={busy} type="submit" style={{width:"100%"}}>{busy?"Submitting your request...":"Submit quotation request"} <UploadCloud size={17}/></button></div>
 </form>;
}