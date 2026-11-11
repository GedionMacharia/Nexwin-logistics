import { MessageCircle } from "lucide-react";
export default function WhatsApp() {
 const number=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254703612611";
 const msg=encodeURIComponent("Hello Nexwin Logistics, I would like to enquire about your services.");
 return <a className="whatsapp" href={`https://wa.me/${number}?text=${msg}`} target="_blank" rel="noreferrer" aria-label="Chat with Nexwin Logistics on WhatsApp"><MessageCircle size={25}/></a>;
}