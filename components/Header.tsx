'use client';
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [open,setOpen] = useState(false);
  const links = [["Home","/"],["Services","/#services"],["How it works","/#process"],["About","/about"],["Contact","/contact"]];
  return <header className="site-header"><div className="container nav">
    <Link href="/" className="brand"><span className="brand-mark">N</span><span>NEXWIN<small style={{display:"block",fontSize:9,letterSpacing:".19em",fontWeight:700,color:"#9a722b",marginTop:-3}}>LOGISTICS</small></span></Link>
    <nav className={`nav-links ${open?"open":""}`}>{links.map(([label,href])=><Link key={label} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}</nav>
    <Link href="/quote" className="btn btn-gold nav-cta">Get a free quote <ArrowUpRight size={16}/></Link>
    <button className="menu-toggle" aria-label="Toggle menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  </div></header>;
}