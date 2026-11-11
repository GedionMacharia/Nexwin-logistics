import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { BookOpen, Search, PenTool, FileText, Presentation, BriefcaseBusiness, Languages, FileCheck2, GraduationCap, ArrowUpRight } from "lucide-react";
const items=[
 ["Academic learning support",BookOpen,"Planning, study guidance, feedback and support to help learners develop their own work."],
 ["Essay planning & feedback",GraduationCap,"Help understanding a prompt, organizing ideas, building an outline and reviewing a draft."],
 ["Research assistance",Search,"Research question development, source discovery, literature searching and research organization."],
 ["Literature review support",FileCheck2,"Guidance on finding, grouping and synthesizing relevant literature, plus editing for clarity."],
 ["Editing & proofreading",PenTool,"Grammar, spelling, punctuation, readability, consistency and formatting review."],
 ["Dissertation & thesis editing",BookOpen,"Language editing, structure feedback and presentation support while preserving the author's work."],
 ["Case study learning support",FileText,"Guidance with case analysis, critical thinking, structure and clear written expression."],
 ["Business writing",BriefcaseBusiness,"Business reports, proposals, professional correspondence and company documents."],
 ["Articles & blog content",FileText,"Readable, audience-focused articles, web copy and blog content."],
 ["Technical writing",Search,"Clear technical explanations, user documentation, process guides and structured content."],
 ["Reports & document formatting",FileCheck2,"Professional formatting, headings, tables of contents and document consistency."],
 ["PowerPoint presentations",Presentation,"Purposeful slide design, clear messaging and presentation structure."],
 ["Referencing & citation formatting",Languages,"Formatting and consistency checks for APA, MLA, Harvard and Chicago styles."],
 ["CVs & cover letters",BriefcaseBusiness,"Professional CVs, cover letters and profile writing tailored to your experience."],
 ["Document & PDF services",FileText,"Document conversion, layout cleanup and preparation of polished digital files."]
];
export default function Services(){return <SiteShell><section className="page-hero"><div className="container"><span className="eyebrow" style={{color:"#e3c27f"}}>OUR SERVICES</span><h1>Support for every kind of document.</h1><p>Explore our writing, editing, research-support and document services. Every request is reviewed according to its scope and requirements.</p><Link className="btn btn-gold" href="/quote">Request a quotation <ArrowUpRight size={16}/></Link></div></section><section className="section"><div className="container"><div className="services-grid">{items.map(([title,Icon,desc])=>{const I=Icon as any;return <article className="service-card" key={title as string}><div className="service-icon"><I size={22}/></div><h3>{title as string}</h3><p>{desc as string}</p><Link className="text-link" href={`/quote?service=${encodeURIComponent(title as string)}`}>Request this service <ArrowUpRight size={15}/></Link></article>})}</div><div className="notice" style={{marginTop:30}}>Academic integrity: Academic services are limited to tutoring, research guidance, editing, proofreading and feedback. Clients remain responsible for producing and submitting their own assessed work.</div></div></section></SiteShell>}