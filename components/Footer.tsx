import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const email=process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "writerssolutions4@gmail.com";
  const phone=process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+254703612611";
  return <footer className="footer"><div className="container">
    <div className="footer-grid">
      <div><div className="brand" style={{color:"white"}}><span className="brand-mark">N</span><span>NEXWIN<small style={{display:"block",fontSize:9,letterSpacing:".19em",color:"#d9ae58",marginTop:-3}}>LOGISTICS</small></span></div><p style={{maxWidth:280,marginTop:20}}>Professional writing support and document services that help you communicate with clarity and confidence.</p></div>
      <div><h4>Explore</h4><div className="footer-links"><Link href="/">Home</Link><Link href="/#services">Our services</Link><Link href="/about">About us</Link><Link href="/quote">Get a quotation</Link></div></div>
      <div><h4>Popular services</h4><div className="footer-links"><Link href="/#services">Editing & proofreading</Link><Link href="/#services">Research support</Link><Link href="/#services">Business writing</Link><Link href="/#services">Presentations</Link></div></div>
      <div><h4>Get in touch</h4><div className="footer-links"><a href={`mailto:${email}`}><Mail size={13} style={{display:"inline",marginRight:7}}/>{email}</a><a href={`tel:${phone}`}><Phone size={13} style={{display:"inline",marginRight:7}}/>{phone}</a><span><MapPin size={13} style={{display:"inline",marginRight:7}}/>Meru, Kenya</span><Link href="/contact">Contact us <ArrowUpRight size={13} style={{display:"inline"}}/></Link></div></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Nexwin Logistics. All rights reserved.</span><span><Link href="/privacy">Privacy policy</Link>　·　<Link href="/terms">Terms of service</Link></span></div>
  </div></footer>;
}