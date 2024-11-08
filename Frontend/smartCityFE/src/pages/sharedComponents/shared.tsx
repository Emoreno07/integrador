import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
export default function SharedComponents(){
    const location = useLocation();
    return (
        <>
           {location.pathname !== '/login' && <Header/>}
            <Outlet/>
            <Footer/>
        </>
    )
}