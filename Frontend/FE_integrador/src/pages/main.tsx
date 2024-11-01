import { Link, Outlet } from "react-router-dom";

export default function MainPage(){
    return(
     <div>
        <Link to='login'>MainPage</Link>
        <Outlet/> 
    </div>
      
    )
}