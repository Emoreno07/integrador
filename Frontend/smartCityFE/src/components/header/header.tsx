import { useNavigate } from 'react-router-dom';
import barco from '/assets/barco.png';
import styles from './header.module.css'
import { useCookies } from 'react-cookie';
export default function Header(){
    const [cookies,setCookies,removeCookies] = useCookies();
    const nav = useNavigate()
    return(
        <header className={`flex-container flex-center ${styles['header']}`}>
        <img src={barco} alt="no" className={`${styles['img']}`} />
        <nav className={`flex-container flex-center grow ${styles['nav']}`}>
            <a href="" className={`${styles['a']}`}>SMART</a>
            <a href="" className={`${styles['a']}`}>AREAS</a>
            <a href="" className={`${styles['a']}`}>DASHBOARDS</a>
            <a href="/sensores" className={`${styles['a']}`}>SENSORES</a>
        </nav>
        <button onClick={() => {
            removeCookies('refreshToken');
            nav('/login')
        }}>SAIR</button>
        </header>
    )
}