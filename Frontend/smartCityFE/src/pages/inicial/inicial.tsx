import { Router, useLocation, useNavigate } from 'react-router-dom';
import { getAccessByRefresh } from '../../services/loginService';
import styles from './inicial.module.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
export default function Inicial(){
    const navigation = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies();
    useEffect(() =>{
        async function getLog(){
            const [isAuthorized, access] = await getAccessByRefresh(cookies['refreshToken']);
            if(!isAuthorized || !access){
                navigation('/login')
            }
        }
        getLog()
        return () =>{}
    },[cookies])
    return(
        <main className={`flex-container flex-center`}>
            <section className={`flex-container flex-center`}>
                <p className={`flex-container flex-center titulo`} >SMART CITY</p>
                {/* <img className={` ${styles['img-logo']}`} src={logo} alt="" />  */}
            </section>
            <section className={`flex-container flex-center `}>
                <div className={`flex-container grow flex-column ${styles['area']} ${styles['como-ver']}`}>
                    <h1 className={`${styles['h1']}`}>COMO VER TODAS AS INFORMAÇÕES EM TEMPO REAL?</h1>
                    <button style={{backgroundColor: '#000'}} onClick={() => navigation('/sensores')}>VER MAIS</button>
                </div>
                <div className={`flex-container grow flex-column ${styles['area']} ${styles['o-que']}`}>
                    <h1 className={`${styles['h1']}`}>O QUE É A SMARTCITY? E O QUE ELA FAZ?</h1>
                    <h2 className={`${styles['h2']}`}>aplicativo desenvolvido com a intenção de</h2>
                    <button >VER MAIS</button>
                </div>
            </section>
            <section className={`flex-container flex-center`}>
                <p className={`flex-container flex-center titulo`} >SMART CITY</p>
                {/* <img className={` ${styles['img-logo']}`} src={logo} alt="" />  */}
            </section>
        </main>     
    )
}