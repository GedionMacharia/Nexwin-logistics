import Header from "./Header";
import Footer from "./Footer";
import WhatsApp from "./WhatsApp";
export default function SiteShell({children}:{children:React.ReactNode}) {
 return <><Header/>{children}<Footer/><WhatsApp/></>;
}