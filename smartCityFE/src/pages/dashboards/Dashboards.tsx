import styles from './dashboards.module.css'
import AreaDashboard from '../../components/AreaDashboard/AreaDashboard'
import { tipos} from '../../utils/types'
import { useEffect, useState } from 'react'
import { LogWithToken } from '../../services/loginService'
import { useCookies } from 'react-cookie'
export default function DashBoards(){
    const [token,setToken] = useState('');
    const [cookies, setCookies,removeCookies] = useCookies();
    useEffect(() =>{
        (async () =>{
            const token = await LogWithToken(cookies['refreshToken'])
            setToken(token)
        })()
    },[])
    return(
        <main className={`flex-container flex-center flex-column ${styles['main-dashboard']}`}>
            {token && tipos.map((tipo,i) =>(
                <AreaDashboard key={i} access={token} tipo={tipo}/>
            ))}
        </main>
    )
}