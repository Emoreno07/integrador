import classNames from "classnames";
import styles from './login.module.css'
import { useEffect } from "react";
import Cookies from "js-cookie";
export default function Login(){
    useEffect(() =>{ 
    })
    return(
        <main className="flex-container-center">   
            <section className={classNames('flex-center-column',styles.main)}>
                <p>Login</p>
            </section>    
        </main>
    )
}